const React = require('react');
module.exports = Frame;
function Frame(props) {
    return (React.createElement("svg", { x: props.offset * props.width },
        React.createElement("use", { xlinkHref: "#a" }),
        props.children));
}
//# sourceMappingURL=Frame.js.map