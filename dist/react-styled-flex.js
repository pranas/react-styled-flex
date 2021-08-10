var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var FlexGapSupportedClassName = 'flex-gap-supported';
var FlexGapNotSupportedClassName = 'flex-gap-not-supported';
var boxPropsArr = ['sizing', 'position', 'height', 'maxHeight', 'minHeight', 'width', 'maxWidth', 'minWidth', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'm', 'mt', 'mr', 'mb', 'ml', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'p', 'pt', 'pr', 'pb', 'pl', 'border'];
var flexBoxPropsArr = ['inline', 'wrap', 'reverse', 'wrapReverse', 'column', 'center', 'justifyContent', 'justifyItems', 'alignItems', 'alignContent', 'gap', 'columnGap', 'rowGap'];
var flexItemPropsArr = ['box', 'order', 'grow', 'shrink', 'basis', 'flex', 'alignSelf', 'justifySelf'];
var boxProps = boxPropsArr.slice();
var flexBoxProps = flexBoxPropsArr.slice();
var flexItemProps = flexItemPropsArr.slice().concat(flexBoxProps);

if (typeof document !== 'undefined') {
  var htmlDocument = document;
  var htmlBody = htmlDocument.body;
  var bodyClassList = htmlBody.classList;

  var flexGapSupported = function flexGapSupported() {
    var PARENT_WIDTH = 10;
    var GAP = 4;
    /* create test node */

    var parent = htmlDocument.createElement('div');
    parent.style.visibility = 'hidden';
    parent.style.height = '1px';
    parent.style.width = PARENT_WIDTH + "px";
    parent.style.display = 'flex';
    parent.style.gap = GAP + "px";
    parent.innerHTML = '<div id="react-styled-flex-gap-detector-element" style="flex:1"></div><div style="flex:1"></div>';
    /* carry out tests */

    htmlBody.appendChild(parent);

    var _window$getComputedSt = window.getComputedStyle(parent.firstElementChild),
        width = _window$getComputedSt.width;

    htmlBody.removeChild(parent);
    /* Remove node and return result */

    return width === (PARENT_WIDTH - GAP) / 2 + "px";
  };

  if (flexGapSupported()) {
    bodyClassList.add(FlexGapSupportedClassName);
    bodyClassList.remove(FlexGapNotSupportedClassName);
  } else {
    bodyClassList.add(FlexGapNotSupportedClassName);
    bodyClassList.remove(FlexGapSupportedClassName);
  }
}

var FlexGapSupportedIdentifier = "." + FlexGapSupportedClassName + " &&";
var FlexGapNotSupportedIdentifier = "." + FlexGapNotSupportedClassName + " &&";

var boxModelStyles = function boxModelStyles(props) {
  return {
    boxSizing: props.sizing,
    position: props.position,
    height: props.height,
    maxHeight: props.maxHeight,
    minHeight: props.minHeight,
    width: props.width,
    maxWidth: props.maxWidth,
    minWidth: props.minWidth,
    margin: props.margin || props.m,
    marginTop: props.marginTop || props.mt,
    marginRight: props.marginRight || props.mr,
    marginBottom: props.marginBottom || props.mb,
    marginLeft: props.marginLeft || props.ml,
    padding: props.padding || props.p,
    paddingTop: props.paddingTop || props.pt,
    paddingRight: props.paddingRight || props.pr,
    paddingBottom: props.paddingBottom || props.pb,
    paddingLeft: props.paddingLeft || props.pl,
    border: props.border
  };
};

var flexStyles = function flexStyles(props) {
  var inline = props.inline,
      wrapReverse = props.wrapReverse,
      alignContent = props.alignContent,
      justifyItems = props.justifyItems,
      column = props.column,
      reverse = props.reverse,
      wrap = props.wrap,
      gap = props.gap,
      columnGap = props.columnGap,
      rowGap = props.rowGap,
      center = props.center;
  var display = inline ? 'inline-flex' : 'flex';
  var justifyContent = props.justifyContent,
      alignItems = props.alignItems;
  var flexDirection;
  var flexWrap;

  if (center) {
    justifyContent = justifyContent || 'center';
    alignItems = alignItems || 'center';
  }

  if (column || reverse) {
    flexDirection = column ? 'column' : 'row';
    flexDirection += reverse ? '-reverse' : '';
  }

  if (wrap) flexWrap = 'wrap';
  if (wrapReverse) flexWrap = 'wrap-reverse';
  var result = {
    display: display,
    flexWrap: flexWrap,
    justifyContent: justifyContent,
    alignItems: alignItems,
    flexDirection: flexDirection,
    alignContent: alignContent,
    justifyItems: justifyItems
  };

  if (gap || columnGap || rowGap) {
    result[FlexGapSupportedIdentifier] = {
      gap: gap,
      rowGap: rowGap,
      columnGap: columnGap
    };

    if (wrap) ; else {
      var _ref, _result$FlexGapNotSup;

      var marginProp = column ? 'bottom' : 'right';
      var child = reverse ? 'first' : 'last';
      var gapProp = (column ? rowGap : columnGap) || gap;
      result[FlexGapNotSupportedIdentifier] = (_result$FlexGapNotSup = {}, _result$FlexGapNotSup["& > :not(:" + child + "-child)"] = (_ref = {}, _ref["margin-" + marginProp] = gapProp, _ref), _result$FlexGapNotSup);
    }
  }

  return result;
};

var flexItemStyles = function flexItemStyles(props) {
  return {
    order: props.order,
    flex: props.flex,
    alignSelf: props.alignSelf,
    justifySelf: props.justifySelf,
    flexBasis: props.basis,
    flexShrink: props.shrink,
    flexGrow: props.grow
  };
};

var Box = styled__default['default']('div').withConfig({
  displayName: 'Box',
  shouldForwardProp: function shouldForwardProp(prop) {
    return boxProps.indexOf(prop) === -1;
  }
})(boxModelStyles);
var FlexBox = styled__default['default'](Box).withConfig({
  displayName: 'FlexBox',
  shouldForwardProp: function shouldForwardProp(prop) {
    return flexBoxProps.indexOf(prop) === -1;
  }
})(flexStyles);
var FlexItem = styled__default['default'](Box).withConfig({
  displayName: 'FlexItem',
  shouldForwardProp: function shouldForwardProp(prop) {
    return flexItemProps.indexOf(prop) === -1;
  }
})(flexItemStyles, function (props) {
  return props.box ? flexStyles : '';
});

exports.Box = Box;
exports.FlexBox = FlexBox;
exports.FlexGapNotSupportedClassName = FlexGapNotSupportedClassName;
exports.FlexGapSupportedClassName = FlexGapSupportedClassName;
exports.FlexItem = FlexItem;
//# sourceMappingURL=react-styled-flex.js.map
