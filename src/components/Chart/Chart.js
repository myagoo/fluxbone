var React = require('react');

var {Panel} = require('react-bootstrap');

var {randomColor, extend} = require('utils.js');

var Chartjs = require('chart.js/Chart.js');

var Chart = React.createClass({
    getInitialState: function(){
        return {
            chart: undefined
        };
    },
    componentDidUpdate: function(prevProps, prevState){
        console.log('chart componentDidUpdate', prevProps, this.props);
        if(this.props.type !== prevProps.type){
            this.createChart(this.props.type, this.props.data);
        }else if(this.props.data != prevProps.data){
            this.updateChart(this.props.data);
        }
    },
    createChart: function(chartType, rawData, options){
        console.log('createChart', chartType, rawData, options);
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: this.refs.chart.getDOMNode()
            },

            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        });

        console.log('prout', chart);


        this.setState({
            chart: chart
        });

        return


        var context = this.refs.canvas.getDOMNode().getContext("2d");
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
        /*console.info('updateChart', rawData);

        if(!this.state.chart){
            return;
        }

        var index = this.state.chart.segments.length;
        while(index){
            this.state.chart.removeData(--index);
        }

        rawData.map(function(rawDatum){
            return extend({
                color: randomColor()
            }, rawDatum);
        }).forEach(function(datum, index){
            this.state.chart.addData(datum, index, true);
        }.bind(this));

        this.state.chart.update();*/
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
                <div ref="chart" style={{width: this.props.width, height: this.props.height}} />
            </Panel>
        );
    }
});

module.exports = Chart;
