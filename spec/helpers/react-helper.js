var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

class ReactHelper {
  setup() {
    this._el = document.createElement('div');
    this._el.setAttribute('id', 'specHelper');
    document.body.appendChild(this._el);

    this._mockedComponents = {};
  }

  teardown() {
    document.body.removeChild(this._el);

    _.each(this._mockedComponents, function(mock) {
      mock.component.prototype.render = mock.renderFn;
    });
  }

  render(jsx) {
    ReactDOM.render(
      jsx,
      this._el
    );
    return this._el;
  }

  _addMockForComponent(component) {
    this._mockedComponents[component.name] = {
      component: component,
      renderFn: component.prototype.render
    };
  }

  mockComponent(component) {
    this._addMockForComponent(component);  

    component.prototype.render = function mockRender() {
      return (<div/>);
    };
  }

  mockComponentWithClassName(component, className) {
    this._addMockForComponent(component);
    
    component.state = { className: className };

    component.prototype.render = function mockRender() {
      this.state = {className: className}
      return (<div className={this.state.className}/>);
    };
  }
}

module.exports = new ReactHelper();
