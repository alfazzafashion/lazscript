const React = require('react');
const color = require('./color');
const styled = require('./styled');
module.exports = Cursor;
function Cursor(props) {
    return React.createElement(StyledCursor, { height: props.height, theme: props.theme, width: props.width, x: props.x, y: props.y });
}
const StyledCursor = styled.rect `
  fill: ${props => color(props.theme.cursor)};
`;
//# sourceMappingURL=Cursor.js.map