/*Downloaded from https://www.codeseek.co/oatssss/ace-editor-marker-popovers-oYxJQV */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This codepen uses a custom Ace build to achieve marker popovers
// PR details here: https://github.com/ajaxorg/ace/pull/3143

var editor = ace.edit('editor');
var Range = ace.require('ace/range').Range;

// Extension Methods ------------------------------------
String.prototype.splitOneCharacter = function (delim) {
  var ret = [];
  var splits = this.split(delim);
  var index = 0;
  for (var i = 0; i < splits.length; i++) {
    ret.push([index, splits[i]]);
    index += splits[i].length + 1;
  }
  return ret;
};
// Returns a random integer between min (included) and max (excluded)
Math.getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
// Returns a word randomly picked from the editor along with its range
var lines = editor.getValue().splitOneCharacter(/\n/);
lines = lines.map(function (line, i) {
  return [i, line[1].splitOneCharacter(/\s+/)];
});
function getRandomWord() {
  var randomLine = lines[Math.getRandomInt(2, lines.length)];
  var randomWord = randomLine[1][Math.getRandomInt(0, randomLine[1].length)];
  var range = new Range(randomLine[0], randomWord[0], randomLine[0], randomWord[0] + randomWord[1].length);
  range.start = editor.getSession().doc.createAnchor(range.start);
  range.end = editor.getSession().doc.createAnchor(range.end);
  var word = randomWord[1];
  return { range: range, word: word };
};

// React Components ------------------------------------
var _ReactBootstrap = ReactBootstrap,
    Overlay = _ReactBootstrap.Overlay,
    Popover = _ReactBootstrap.Popover; // Lookup 'es6 destructuring assignment' if this line confuses you

var MarkerPopup = function (_React$Component) {
  _inherits(MarkerPopup, _React$Component);

  function MarkerPopup(props) {
    _classCallCheck(this, MarkerPopup);

    var _this = _possibleConstructorReturn(this, (MarkerPopup.__proto__ || Object.getPrototypeOf(MarkerPopup)).call(this, props));

    _this.state = { show: false };
    return _this;
  }

  _createClass(MarkerPopup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        Overlay,
        {
          ref: function ref(overlay) {
            return _this2.overlay = overlay;
          },
          target: function target() {
            return _this2.props.overlayTarget;
          },
          container: $('#editor')[0],
          placement: this.props.overlayPlacement,
          rootClose: true,
          onHide: function onHide() {
            return _this2.setState({ show: false });
          },
          show: this.state.show
        },
        this.props.children
      );
    }
  }]);

  return MarkerPopup;
}(React.Component);

// Helper Methods ------------------------------------
// Returns a string array containing the HTML making up an Ace marker


function getMarkerHTML(html, markerLayer, session, config, range, markerClass) {
  var stringBuilder = [];
  if (range.isMultiLine()) {
    // drawTextMarker is defined by ace's marker layer
    markerLayer.drawTextMarker(stringBuilder, range, markerClass, config);
  } else {
    // drawSingleLineMarker is defined by ace's marker layer
    markerLayer.drawSingleLineMarker(stringBuilder, range, markerClass + ' ace_start ace_br15', config);
  }

  return stringBuilder;
}
// Defines a generic dynamicMarker update that renders a bootstrap popover on mouseenter
function customUpdateWithOverlay(markerClass, markerRange, overlayPlacement, overlayTitle, overlayContent, overrideWidth) {
  var _this3 = this;

  return function (html, markerLayer, session, config) {
    // Use the helper method above to get the marker's HTML as a string (how Ace normally does it)
    var markerHTML = getMarkerHTML(html, markerLayer, session, config, markerRange, markerClass);
    // Use jQuery to parse that HTML into an actual DOM element
    var markerElement = $.parseHTML(markerHTML.join(''))[0];
    // From here, we can manipulate the DOM element however we so choose
    // In this case, we use it as a root for ReactDOM and use
    // react-bootstrap components to render a popover
    ReactDOM.render(React.createElement(
      MarkerPopup,
      {
        ref: function ref(popup) {
          return _this3.popup = popup;
        },
        overlayTarget: markerElement,
        overlayPlacement: overlayPlacement
      },
      React.createElement(
        Popover,
        {
          placement: overlayPlacement,
          title: overlayTitle,
          style: overrideWidth ? { maxWidth: '100%' } : {}
        },
        overlayContent
      )
    ), markerElement);
    $(markerElement).css('pointer-events', 'auto');
    // Since we have the actual DOM element, we can bind event handlers to it
    $(markerElement).mouseenter(function () {
      _this3.popup.setState({ show: true });
    });

    // Finally we append the element to the marker layer's DOM as a child
    // Since the marker layer is now using insertAdjacentHTML with this 
    // custom build, the child is retained
    markerLayer.element.appendChild(markerElement);
  };
}

// Pick random words and get their ranges -------------
var word1 = getRandomWord();
/* var word2 = getRandomWord();
var word3 = getRandomWord(); */

// Dynamic Markers ------------------------------------
var highlight1 = {};
highlight1.update = customUpdateWithOverlay.call(highlight1, 'marker1', word1.range, 'bottom', 'Lorem Ipsum Popover', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis velit tellus.', false);

/* var highlight2 = {};
highlight2.update = customUpdateWithOverlay.call(highlight2, 'marker2', word2.range, 'right', 'IFrame DuckDuckGo Popover', React.createElement(
  'div',
  {
    style: {
      height: '200px',
      width: '300px'
    }
  },
  React.createElement('iframe', { src: '//duckduckgo.com/?q=' + word2.word, height: '200px', width: '300px' })
), true);

var highlight3 = {};
highlight3.update = customUpdateWithOverlay.call(highlight3, 'marker3', word3.range, 'right', 'Recursive IFrame Popover', React.createElement(
  'div',
  {
    style: {
      height: '300px',
      width: '600px'
    }
  }, */
  React.createElement('iframe', { src: '//s.codepen.io/oatssss/debug/oYxJQV?allowInfiniteRecursion=' + Math.random(), height: '300px', width: '600px' })
), true);

// Finally, add the markers to the editor
var marker1 = editor.session.addDynamicMarker(highlight1);
/* var marker2 = editor.session.addDynamicMarker(highlight2);
var marker3 = editor.session.addDynamicMarker(highlight3); */