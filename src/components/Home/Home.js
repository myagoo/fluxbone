var React = require('react');

var {ListGroup, ListGroupItem} = require('react-bootstrap');

var NotificationActions = require('actions/NotificationActions.js');

var LastFm = require('api/lastfm.js');

var {debounce} = require('utils.js');

var Chart = require('chart.js/Chart.js');

var Home = React.createClass({
    getInitialState: function(){
        return {
            username: ''
        };
    },
    loadUserInfo: debounce(function(userName){

        LastFm.user.getNewReleases(userName, true).then(function(newReleases){
            this.setState({
                newReleases: newReleases
            });
        }.bind(this)).catch(function(error){
            NotificationActions.create({
                type: 'error',
                message: error.message
            });
        });

        LastFm.user.getTopArtists(userName).then(function(topArtists){
            this.setState({
                topArtists: topArtists
            });
        }.bind(this)).catch(function(error){
            NotificationActions.create({
                type: 'error',
                message: error.message
            });
        });

        LastFm.user.getInfo(userName).then(function(userInfo){
            this.setState({
                userInfo: userInfo
            });
        }.bind(this)).catch(function(error){
            NotificationActions.create({
                type: 'error',
                message: error.message
            });
        });

    }, 1000),
    handleChange: function(e){

        var username =  this.refs.username.getDOMNode().value;

        this.loadUserInfo(username);

        this.setState({
            username: username
        });
    },
    renderNewReleases: function(newReleases){
        if(newReleases === undefined){
            return;
        }

        return newReleases.albums.album.map(function(album){

            var imgSrc = album.image.filter(function(image){
                return image.size === 'medium';
            })[0]['#text'];

            return <ListGroupItem onClick><img src={imgSrc} />{album.name}</ListGroupItem>;
        }.bind(this));
    },
    renderTopArtist: function(topArtists){
        if(topArtists === undefined){
            return;
        }
        var ctx = this.refs.topArtists.getDOMNode().getContext("2d");

        var data = topArtists.topartists.artist.slice(0, 10).map(function(artist){
            return {
                label: artist.name,
                value: parseInt(artist.playcount, 10)
            };
        });

        var chart = new Chart(ctx).Doughnut(data);
    },
    render: function(){

        var newReleases = this.renderNewReleases(this.state.newReleases);
        var topArtists = this.renderTopArtist(this.state.topArtists);

        return (
            <div>
                <input ref="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                <pre>{JSON.stringify(this.state.userInfo || {})}</pre>
                <ListGroup>{newReleases}</ListGroup>
                <canvas ref="topArtists" id="topArtists" width="400" height="400"></canvas>
            </div>

        );
    }
});

module.exports = Home;
