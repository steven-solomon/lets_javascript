var React = require('react');
var ReactHelper = require('../helpers/react-helper');

const initialClassName = 'initial-class-name';
const mockComponentWithClassName = 'mocked-component-class-name';

class DummyComponent extends React.Component {
  constructor() {
    super();
    this.state = {className: initialClassName};
  }

  render() {
    return (
      <div className={this.state.className}>I have some contents</div>
    );
  }
}

describe('ReactHelper', function() {
  describe('-mockComponent', function() {
    describe('preventing test pollution when rendering', function() {
      describe('a mocked component (before an unmocked test)', function() {
        beforeEach(function() {
          ReactHelper.mockComponent(DummyComponent);
          this.el = ReactHelper.render(
            <DummyComponent />
          );
        });

        it('is rendered into the DOM without any children', function() {
          expect(this.el.textContent).toEqual('');
        });
      });

      describe('an unmocked component (after a mocked test)', function() {
        beforeEach(function() {
          this.el = ReactHelper.render(
            <DummyComponent />
          );
        });

        it('is rendered into the DOM normally', function() {
          expect(this.el.textContent).toEqual('I have some contents');
        });
      });
    });
  });

  describe('-mockComponentWithClassName', function() {
    describe('preventing test pollution when rendering', function() {
      describe('a mocked component (before an unmocked test)', function() {
        beforeEach(function() {
          ReactHelper.mockComponentWithClassName(DummyComponent, mockComponentWithClassName);
          this.el = ReactHelper.render(
            <DummyComponent />
          );
        });

        it('is rendered into the DOM without any children', function() {
          expect(this.el.textContent).toEqual('');
        });

       it('is rendered into the DOM with a className', function() {
          expect(this.el.getElementsByClassName(mockComponentWithClassName).length).toEqual(1);
          expect(this.el.getElementsByClassName(initialClassName).length).toEqual(0);
        });
      });

      describe('an unmocked component (after a mocked test)', function() {
        beforeEach(function() {
          this.el = ReactHelper.render(
            <DummyComponent />
          );
        });

        it('is rendered into the DOM normally', function() {
          expect(this.el.textContent).toEqual('I have some contents');
        });

        it('is rendered into the DOM with initial-class-name', function() {
          expect(this.el.getElementsByClassName(mockComponentWithClassName).length).toEqual(0);
          expect(this.el.getElementsByClassName(initialClassName).length).toEqual(1);
        });
      });
    });
  });
});
