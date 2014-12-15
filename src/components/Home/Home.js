var React = require('react');
var Reflux = require('reflux');

var {ListGroup, ListGroupItem} = require('react-bootstrap');
var Chart = require('components/Chart/Chart.js');

var NewReleasesStore = require('stores/NewReleasesStore.js');
var TopArtistsStore = require('stores/TopArtistsStore.js');

var NotificationActions = require('actions/NotificationActions.js');

var NewReleasesActions = require('actions/NewReleasesActions.js');
var TopArtistsActions = require('actions/TopArtistsActions.js');

var LastFm = require('api/lastfm.js');

var {debounce, randomColor} = require('utils.js');

var Home = React.createClass({
    mixins: [
        Reflux.listenTo(NewReleasesStore,"onNewReleasesChange"),
        Reflux.listenTo(TopArtistsStore,"onTopArtistsChange"),
    ],
    getInitialState: function(){
        return {
            username: '',
        };
    },
    onNewReleasesChange: function(){
        console.log('Home onNewReleasesChange');
        this.setState({
            newReleases: NewReleasesStore.getNewReleases()
        })
    },
    onTopArtistsChange: function(){
        console.log('Home onTopArtistsChange');
        this.setState({
            topArtists: TopArtistsStore.getTopArtists()
        });
    },
    loadUserInfo: debounce(function(userName){
        console.log('Home loadUserInfo', userName);

        NewReleasesActions.load(userName);
        TopArtistsActions.load(userName);

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
        console.log('Home handleChange', e);

        var username =  this.refs.username.getDOMNode().value;

        this.loadUserInfo(username);

        this.setState({
            username: username
        });
    },
    renderNewReleases: function(newReleases){
        console.log('Home renderNewReleases', newReleases);

        if(newReleases === undefined || newReleases.albums.album === undefined){
            return;
        }
        return newReleases.albums.album.map(function(album){

            var imgSrc = album.image.filter(function(image){
                return image.size === 'medium';
            })[0]['#text'];

            return <ListGroupItem style={{backgroundColor: randomColor()}} onClick><img src={imgSrc} />{album.name}</ListGroupItem>;
        }.bind(this));
    },
    renderTopArtist: function(topArtists){
        console.log('Home renderTopArtist', topArtists);
        if(topArtists === undefined || topArtists.topartists.artist === undefined){
            return;
        }

        var data = topArtists.topartists.artist.slice(0, 10).map(function(artist){
            return {
                label: artist.name,
                value: parseInt(artist.playcount, 10),
            };
        });

        return <Chart title="Top artists" width={250} height={250} type="Doughnut" data={data} />
    },

    render: function(){
        console.log('Home render');

        var newReleases = this.renderNewReleases(this.state.newReleases);
        var topArtists = this.renderTopArtist(this.state.topArtists);

        return (
            <div>
                <input ref="username" type="text" onChange={this.handleChange} value={this.state.username}/>
                <pre>{JSON.stringify(this.state.userInfo || {})}</pre>
                <ListGroup>{newReleases}</ListGroup>
                {topArtists}
            </div>

        );
    }
});

module.exports = Home;
