var React = require('react');

var {Panel} = require('react-bootstrap');

var {randomColor, extend} = require('utils.js');

var Chartjs = require('chart.js/Chart.js');

console.log('Chartjs', Chartjs)

var PChart = React.createClass({
    getInitialState: function(){
        return {
            chart: undefined
        };
    },
    componentDidUpdate: function(prevProps, prevState){
        console.log('chart componentDidUpdate', prevProps, this.props);
        if(this.props.type !== prevProps.type){
            this.createChart(this.props.type, this.props.data);
        }else if(this.props.data !== prevProps.data){
            console.log(this.state, prevState)
            this.updateChart(this.props.data);
        }
    },
    createChart: function(chartType, rawData, options){
        console.log('prout');
        var context = this.refs.canvas.getDOMNode().getContext("2d");

        console.log('createChart', context);

        var chartData = rawData.map(function(rawDatum){
            return extend({
                color: randomColor()
            }, rawDatum);
        });

        this.setState({
            chart: new Chartjs(context, options)[chartType](chartData)
        });
    },
    updateChart: function(rawData){
        console.info('updateChart', rawData);

        if(!this.state.chart){
            return;
        }

        var index = this.state.chart.segments.length;
        while(--index){
            this.state.chart.removeData(index);
        }

        rawData.map(function(rawDatum){
            return extend({
                color: randomColor()
            }, rawDatum);
        }).forEach(function(datum, index){
            this.state.chart.addData(datum, index, true);
        });

        this.state.chart.update();
    },
    componentDidMount: function(){
        console.log('Chart componentDidMount');
        this.createChart(this.props.type, this.props.data);
    },
    componentWillUnmount: function(){
        console.log('Chart componentWillUnmount');
        this.state.chart && this.state.chart.destroy();
    },
    render: function(){
        console.log('Chart render');
        return (
            <Panel header={this.props.title} {...this.props}>
                <canvas ref="canvas" width={this.props.width} height={this.props.height}></canvas>
            </Panel>
        );
    }
});

module.exports = PChart;
