import React, { Component } from 'react';
import {
  compose,
  withState,
} from 'recompose';
import {
  connect,
} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {
  Tooltip,
  withTooltip,
} from './Tooltip';
import {
  contentSelector
} from './state';

const ManualPopover = ({ children, open, onRequestClose, content }) => {
  return (
    <Tooltip
      useContext
      html={content}
      position={"bottom"}
      open={open}
      onRequestClose={onRequestClose}
      trigger="manual"
      interactive
      animateFill={false}
    >
      {children}
    </Tooltip>
  );
};

class Menu extends React.Component {
  state = { visible: false };
  render() {
    const { selected, children } = this.props;

    const PopoverContent = (
      <div onClick={() => this.setState({ visible: false })}>
        {children}
      </div>
    );

    return (
      <div>
        <ManualPopover
          open={this.state.visible}
          content={PopoverContent}
          onRequestClose={() => {
            console.log('triggered');
            this.setState({ visible: false });
          }}
        >
          <button onClick={e => this.setState({ visible: !this.state.visible })}>
            {selected}
          </button>
        </ManualPopover>
        {children}
      </div>
    );
  }
}

class Example extends React.Component {
  state = { value: 1 };

  render() {
    const { value } = this.state;
    const options = [1, 2];

    return (
      <Menu selected={value}>
        {options.map(option => {
          const isActive = option === value;
          console.log(`Rendering ${option}, isActive: ${isActive}`);
          return (
            <div key={option} onClick={() => this.setState({ value: option })}>
              {option} – {isActive ? "Active" : "Not Active"}
            </div>
          );
        })}
      </Menu>
    );
  }
}


const NormalHeader = () => (
  <h2>Normal component</h2>
);

const Header = () => (
  <h2>Component with tooltip</h2>
);

const HeaderWithTootip = withTooltip(Header, {
  title: 'Welcome to React with tooltip',
});

const mapStateToProps = (state) => ({
  content: contentSelector(state),
});

class TooltipContentComponent extends Component {
  componentWillMount() {
    console.log('mount now');
  }
  componentWillUnmount() {
    console.log('unmount now');
  }

  render() {
    return (
      <div>
        TooltipContent here {this.props.content}
      </div>
    );
  }
};

const TooltipContent = connect(mapStateToProps)(TooltipContentComponent);

class App extends Component {
  state = {
    tooltipSelector: '#testing3',
    tooltipIframeId: 'tooltip-iframe',
  }

  render() {
    const {
      tooltipContent,
      setTooltipContent,
      disabled,
      setDisabled,
      open,
      setIsOpen,
    } = this.props;
    return (
      <div className="App">
        { this.renderTooltip() }

        <button onClick={() => {
          this.tooltipDOM.destroyTippy()
          this.setState({
            tooltipSelector: '#testing3',
            tooltipIframeId: '',
          })
        }}>destroy tooltip</button>
      </div>
    )
  }

  renderTooltip () {
    // document.getElementById(tooltipIframeId).contentWindow.document
    return (
      <Tooltip
        ref={tooltip => this.tooltipDOM = tooltip}
        html={(
          <p>Hello there</p>
        )}
        arrow={true}
        open={true}
        tooltipSelector={this.state.tooltipSelector}
        tooltipIframeId={this.state.tooltipIframeId}
      />
    )
  }
}

const enhance = compose(
  withState('tooltipContent', 'setTooltipContent', 'tooltipContent'),
  withState('open', 'setIsOpen', false),
  withState('disabled', 'setDisabled', false),
);

export default enhance(App);
