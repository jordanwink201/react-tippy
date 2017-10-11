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
  constructor () {
    super()

    const shadowDOMID = 'tooltip-shadow-dom'
    const divHook = document.createElement('div')
    divHook.id = shadowDOMID
    window.document.body.appendChild(divHook)
    const shadowRoot = window.document.getElementById(shadowDOMID).attachShadow({ mode: 'open' })
    const css = `<style>.tippy-touch{cursor:pointer!important}.tippy-notransition{-webkit-transition:none!important;transition:none!important}.tippy-popper{max-width:400px;-webkit-perspective:800px;perspective:800px;z-index:9999;outline:0;-webkit-transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none}.tippy-popper.html-template{max-width:96%;max-width:calc(100% - 20px)}.tippy-popper[x-placement^=top] [x-arrow]{border-top:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;bottom:-7px;margin:0 9px}.tippy-popper[x-placement^=top] [x-arrow].arrow-small{border-top:5px solid #333;border-right:5px solid transparent;border-left:5px solid transparent;bottom:-5px}.tippy-popper[x-placement^=top] [x-arrow].arrow-big{border-top:10px solid #333;border-right:10px solid transparent;border-left:10px solid transparent;bottom:-10px}.tippy-popper[x-placement^=top] [x-circle]{-webkit-transform-origin:0 33%;transform-origin:0 33%}.tippy-popper[x-placement^=top] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%);opacity:1}.tippy-popper[x-placement^=top] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-50%);transform:scale(.15) translate(-50%,-50%);opacity:0}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow]{border-top:7px solid #fff;border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-top:5px solid #fff;border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-top:10px solid #fff;border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow]{border-top:7px solid rgba(0,0,0,.7);border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-top:5px solid rgba(0,0,0,.7);border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-top:10px solid rgba(0,0,0,.7);border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateY(0) rotateX(90deg);transform:translateY(0) rotateX(90deg)}.tippy-popper[x-placement^=top] [data-animation=fade].enter{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade].leave{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift].enter{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift].leave{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale].enter{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale].leave{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=bottom] [x-arrow]{border-bottom:7px solid #333;border-right:7px solid transparent;border-left:7px solid transparent;top:-7px;margin:0 9px}.tippy-popper[x-placement^=bottom] [x-arrow].arrow-small{border-bottom:5px solid #333;border-right:5px solid transparent;border-left:5px solid transparent;top:-5px}.tippy-popper[x-placement^=bottom] [x-arrow].arrow-big{border-bottom:10px solid #333;border-right:10px solid transparent;border-left:10px solid transparent;top:-10px}.tippy-popper[x-placement^=bottom] [x-circle]{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%);opacity:1}.tippy-popper[x-placement^=bottom] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-5%);transform:scale(.15) translate(-50%,-5%);opacity:0}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow]{border-bottom:7px solid #fff;border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-bottom:5px solid #fff;border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-bottom:10px solid #fff;border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow]{border-bottom:7px solid rgba(0,0,0,.7);border-right:7px solid transparent;border-left:7px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-bottom:5px solid rgba(0,0,0,.7);border-right:5px solid transparent;border-left:5px solid transparent}.tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-bottom:10px solid rgba(0,0,0,.7);border-right:10px solid transparent;border-left:10px solid transparent}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateY(0) rotateX(-90deg);transform:translateY(0) rotateX(-90deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade].enter{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade].leave{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift].enter{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift].leave{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale].enter{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale].leave{opacity:0;-webkit-transform:translateY(0) scale(0);transform:translateY(0) scale(0)}.tippy-popper[x-placement^=left] [x-arrow]{border-left:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;right:-7px;margin:6px 0}.tippy-popper[x-placement^=left] [x-arrow].arrow-small{border-left:5px solid #333;border-top:5px solid transparent;border-bottom:5px solid transparent;right:-5px}.tippy-popper[x-placement^=left] [x-arrow].arrow-big{border-left:10px solid #333;border-top:10px solid transparent;border-bottom:10px solid transparent;right:-10px}.tippy-popper[x-placement^=left] [x-circle]{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=left] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-50%);transform:scale(.15) translate(-50%,-50%);opacity:0}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow]{border-left:7px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-left:5px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-left:10px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow]{border-left:7px solid rgba(0,0,0,.7);border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-left:5px solid rgba(0,0,0,.7);border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-left:10px solid rgba(0,0,0,.7);border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateX(0) rotateY(-90deg);transform:translateX(0) rotateY(-90deg)}.tippy-popper[x-placement^=left] [data-animation=fade].enter{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade].leave{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift].enter{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift].leave{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale].enter{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale].leave{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper[x-placement^=right] [x-arrow]{border-right:7px solid #333;border-top:7px solid transparent;border-bottom:7px solid transparent;left:-7px;margin:6px 0}.tippy-popper[x-placement^=right] [x-arrow].arrow-small{border-right:5px solid #333;border-top:5px solid transparent;border-bottom:5px solid transparent;left:-5px}.tippy-popper[x-placement^=right] [x-arrow].arrow-big{border-right:10px solid #333;border-top:10px solid transparent;border-bottom:10px solid transparent;left:-10px}.tippy-popper[x-placement^=right] [x-circle]{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] [x-circle].enter{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=right] [x-circle].leave{-webkit-transform:scale(.15) translate(-50%,-50%);transform:scale(.15) translate(-50%,-50%);opacity:0}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-circle]{background-color:#fff}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow]{border-right:7px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow].arrow-small{border-right:5px solid #fff;border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow].arrow-big{border-right:10px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-circle]{background-color:rgba(0,0,0,.7)}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow]{border-right:7px solid rgba(0,0,0,.7);border-top:7px solid transparent;border-bottom:7px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow].arrow-small{border-right:5px solid rgba(0,0,0,.7);border-top:5px solid transparent;border-bottom:5px solid transparent}.tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow].arrow-big{border-right:10px solid rgba(0,0,0,.7);border-top:10px solid transparent;border-bottom:10px solid transparent}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective].enter{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective].leave{opacity:0;-webkit-transform:translateX(0) rotateY(90deg);transform:translateX(0) rotateY(90deg)}.tippy-popper[x-placement^=right] [data-animation=fade].enter{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade].leave{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift].enter{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift].leave{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale].enter{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale].leave{opacity:0;-webkit-transform:translateX(0) scale(0);transform:translateX(0) scale(0)}.tippy-popper .tippy-tooltip.transparent-theme{background-color:rgba(0,0,0,.7)}.tippy-popper .tippy-tooltip.transparent-theme[data-animatefill]{background-color:transparent}.tippy-popper .tippy-tooltip.light-theme{color:#26323d;box-shadow:0 4px 20px 4px rgba(0,20,60,.1),0 4px 80px -8px rgba(0,20,60,.2);background-color:#fff}.tippy-popper .tippy-tooltip.light-theme[data-animatefill]{background-color:transparent}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.95rem;padding:.4rem .8rem;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip--small{padding:.25rem .5rem;font-size:.8rem}.tippy-tooltip--big{padding:.6rem 1.2rem;font-size:1.2rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive]{pointer-events:auto}.tippy-tooltip[data-inertia]{-webkit-transition-timing-function:cubic-bezier(.53,1,.36,.85);transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip [x-arrow]{position:absolute;width:0;height:0}.tippy-tooltip [x-circle]{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:130%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;overflow:hidden;-webkit-transition:all ease;transition:all ease}.tippy-tooltip [x-circle]:before{content:"";padding-top:90%;float:left}@media (max-width:450px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}</style>
      `
    shadowRoot.innerHTML = css

    this.state = {
      isOpen: true,
      isEdited: false,
      tooltipSelector: '#testing1',
      shadowDOMReference: shadowRoot,
      shouldWatchStateDependency: true,
    }
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
          this.setState({
            shouldWatchStateDependency: false,
          })
        }}>Stop Watching</button>

        <button onClick={() => {
          this.setState({
            isOpen: true,
            tooltipSelector: '#testing2',
          })
        }}>Select Element #222</button>

        <button onClick={() => {
          this.setState({
            isOpen: true,
            tooltipSelector: '#testing3',
          })
        }}>Select Element #3</button>

        <button onClick={() => {
          this.setState({
            isOpen: false,
          })
        }}>hide</button>

        <button onClick={() => {
          this.setState({
            isEdited: true,
          })
        }}>change tooltip html</button>
      </div>
    )
  }

  renderTooltip () {

    const PopoverContent = (
      <div onClick={() => {
        this.setState({ visible: false })
      }}>
        PopoverContent...
      </div>
    )

    return (
      <Tooltip
        html={(
          <div onClick={() => {
            debugger
          }}>
            PopoverContent...
            {this.getSaveButton()}
          </div>
        )}
        arrow={true}
        open={this.state.isOpen}
        offStateDependency={() => {
          this.setState({
            isOpen: false,
          })
        }}
        onStateDependency={() => {
          this.setState({
            isOpen: true,
          })
        }}
        interactive
        tooltipSelector={this.state.tooltipSelector}
        shadowDOMReference={this.state.shadowDOMReference}
        shouldWatchStateDependency={this.state.shouldWatchStateDependency}
      />
    )
  }

  getSaveButton () {
    if (this.state.isEdited)
      return (
        <button>Save</button>
      )
  }
}

const enhance = compose(
  withState('tooltipContent', 'setTooltipContent', 'tooltipContent'),
  withState('open', 'setIsOpen', false),
  withState('disabled', 'setDisabled', false),
);

export default enhance(App);
