import React, { Component } from 'react';
import tippy from './js/tippy';

const defaultProps = {
  html: null,
  position: 'top',
  animation: 'shift',
  animateFill: true,
  arrow: false,
  delay: 0,
  hideDelay: 0,
  trigger: 'mouseenter focus',
  duration: 375,
  hideDuration: 375,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  popperOptions: {},
  beforeShown: () => {},
  shown: () => {},
  beforeHidden: () => {},
  hidden: () => {},
  disabled: false,
  arrowSize: 'regular',
  size: 'regular',
  className: '',
  style: {},
  distance: 10,
  onRequestClose: () => {},
  sticky: false,
  stickyDuration: 200,
  unmountHTMLWhenHide: false,
};

const propKeys = Object.keys(defaultProps)

const detectPropsChanged = (props, prevProps) => {
  const result = [];
  propKeys.forEach(key => {
    if (props[key] !== prevProps[key]) {
      result.push(key);
    }
  })
  return result;
}

const interval = {
  intervals : [],

  make: function (fun, delay) {
    const newKey = this.intervals.length +1
    this.intervals[newKey] = setInterval(fun,delay)
    return newKey
  },

  clear: function ( id ) {
    clearInterval( this.intervals[id] )
    delete this.intervals[id]
    return true
  },

  clearAll: function () {
    for (const key in this.intervals) {
      clearInterval(this.intervals[key])
      delete this.intervals[key]
    }
  }
}

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.initTippy = this._initTippy.bind(this);
    this.destroyTippy = this._destroyTippy.bind(this);
    this.updateTippy = this._updateTippy.bind(this);
    this.updateReactDom = this._updateReactDom.bind(this);
    this.showTooltip = this._showTooltip.bind(this);
    this.hideTooltip = this._hideTooltip.bind(this);
    this.updateSettings = this._updateSettings.bind(this);
  }

  componentDidMount() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    this.initTippy();
  }

  componentWillUnmount() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    this.destroyTippy();
  }

  componentDidUpdate(prevProps) {
    // enable and disabled
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }

    // TO NOTE: this is when a tooltip is already open and only the selector changes because the user didn't close the current tooltip but they clicked to open another tooltip
    // THIS NEEDS to be first Update tooltipSelector
    if (this.props.tooltipSelector !== prevProps.tooltipSelector) {
      this.destroyTippy(this.oldTooltipDOM);
      this.initTippy();
      return;
    }

    if (this.props.disabled === false && prevProps.disabled === true) {
      this.updateSettings('disabled', false);
      this.destroyTippy();
      this.initTippy();
      return;
    }

    if (this.props.disabled === true && prevProps.disabled === false) {
      this.updateSettings('disabled', true);
      this.destroyTippy();
      return;
    }

    // open
    if (this.props.open === true && !prevProps.open) {
      this.updateSettings('open', true);
      setTimeout(() => {
        this.showTooltip();
      }, 0)
    }
    if (this.props.open === false && prevProps.open === true) {
      this.updateSettings('open', false);
      this.hideTooltip();
    }

    if (this.props.html !== prevProps.html) {
      this.updateReactDom();
    }

    // update otherProps
    const propChanges = detectPropsChanged(this.props, prevProps);
    propChanges.forEach(key => {
      this.updateSettings(key, this.props[key]);
    });
  }

  _showTooltip() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    if (this.tippy) {
      const popper = this.tippy.getPopperElement(this.tooltipDOM);
      this.tippy.show(popper, this.props.duration);
    }
  }

  _hideTooltip() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    if (this.tippy) {
      const popper = this.tippy.getPopperElement(this.tooltipDOM);
      this.tippy.hide(popper, this.props.hideDuration);
    }
  }

  _updateSettings(name, value, oldTooltipDOM) {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    if (this.tippy) {
      const tooltip = oldTooltipDOM ? oldTooltipDOM : this.tooltipDOM
      const popper = this.tippy.getPopperElement(tooltip);
      this.tippy.updateSettings(popper, name, value);
    }
  }

  _updateReactDom() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    if (this.tippy) {
      this.updateSettings('reactDOM', this.props.html);
      const popper = this.tippy.getPopperElement(this.tooltipDOM);
      const isVisible = popper.style.visibility === 'visible' || this.props.open;
      if (isVisible) {
        this.tippy.updateForReact(popper, this.props.html);
      }
    }
  }

  _updateTippy() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }
    if (this.tippy) {
      const popper = this.tippy.getPopperElement(this.tooltipDOM);
      this.tippy.update(popper);
    }
  }

  _initTippy() {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }

    const {
      animation,
      animateFill,
      arrow,
      arrowSize,
      beforeHidden,
      beforeShown,
      delay,
      disabled,
      documentContext,
      hideDelay,
      distance,
      duration,
      followCursor,
      hideDuration,
      hideOnClick,
      hidden,
      html,
      inertia,
      interactive,
      interactiveBorder,
      multiple,
      offset,
      popperOptions,
      onRequestClose,
      open,
      offStateDependency,
      onStateDependency,
      position,
      shown,
      size,
      shadowDOMReference,
      sticky,
      stickyDuration,
      shouldWatchStateDependency,
      theme,
      tooltipSelector,
      trigger,
      unmountHTMLWhenHide,
      useContext,
    } = this.props

    if (!this.props.disabled) {
      this.tippy = tippy(this.tooltipDOM, {
        animation,
        animateFill,
        arrow,
        arrowSize,
        beforeShown,
        beforeHidden,
        delay,
        disabled,
        distance,
        documentContext: documentContext ? documentContext : window.document,
        duration,
        followCursor,
        hideDelay,
        hideOnClick,
        hideDuration,
        hidden,
        interactive,
        interactiveBorder,
        inertia,
        multiple,
        offset,
        offStateDependency,
        onRequestClose,
        onStateDependency,
        open,
        performance: true,
        popperOptions,
        position,
        reactDOM: html,
        reactInstance: useContext ? this : undefined,
        shadowDOMReference,
        shown,
        shouldWatchStateDependency: shouldWatchStateDependency ? shouldWatchStateDependency : false,
        size,
        sticky,
        stickyDuration,
        theme,
        trigger,
        useContext,
        unmountHTMLWhenHide,
      });

      const target = documentContext.querySelector(tooltipSelector)

      const isStateDependentInterval = () => {
        if (target.offsetHeight !== 0) {
          if (onStateDependency) onStateDependency.call()
          this.showTooltip()
          interval.clearAll()
          interval.make(isNotStateDependentInterval, 200)
        }
      }

      const isNotStateDependentInterval = () => {
        if (target.offsetHeight === 0) {
          if (offStateDependency) offStateDependency.call()
          interval.clearAll()
          interval.make(isStateDependentInterval, 200)
        }
      }

      if (shouldWatchStateDependency && target.offsetHeight === 0) {
        interval.clearAll()
        interval.make(isStateDependentInterval, 200)
      } else if (open) {
        this.showTooltip();
      }

    } else {
      this.tippy = null;
    }
  }

  _destroyTippy(oldTooltipDOM) {
    if (typeof window === 'undefined' || typeof document === 'undefined' ) {
      return;
    }

    const tooltip = oldTooltipDOM ? oldTooltipDOM : this.tooltipDOM

    if (this.tippy) {
      const popper = this.tippy.getPopperElement(tooltip);
      this.updateSettings('open', false, tooltip);
      this.tippy.hide(popper, 0);
      this.tippy.destroy(popper);
      this.tippy = null;
    }
  }

  render() {
    return (
      <div
        ref={tooltip => {
          const {
            documentContext,
            tooltipSelector,
          } = this.props

          let referenceElement = tooltip

          if (this.props.tooltipSelector) {
            const el = documentContext.querySelector(tooltipSelector)

            if (el)
              referenceElement = el
          }
          
          // Save a reference to the old tooltip when a new selector comes in
          if (referenceElement !== this.tooltipDOM) {
            this.oldTooltipDOM = this.tooltipDOM ? this.tooltipDOM : null
          }
          this.tooltipDOM = referenceElement
        }}
        className={this.props.className}
        tabIndex={this.props.tabIndex}
        style={{
          display: 'inline',
          ...this.props.style
        }}
      >
        {this.props.children}
      </div>
    );
  }
}


Tooltip.defaultProps = defaultProps;

export default Tooltip;
