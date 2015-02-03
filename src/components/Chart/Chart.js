var React = require('react');
var {Panel} = require('react-bootstrap');
var {randomColor, extend} = require('utils.js');
var {Pie} = require("react-chartjs-commonjs");

var Chart = React.createClass({
    render: function(){
        
        var {title, data, ...otherProps} = this.props;
        
        var data = data.map(function(datum) {
            return extend(datum, {
                color: randomColor(),
                highlight: randomColor()
            });
        }.bind(this));
        
        return (
            <Panel header={title} {...otherProps}>
                <Pie data={data}/>
            </Panel>
        );
    }
});

module.exports = Chart;
