var Reflux = require('reflux');

var NotificationActions = require('actions/NotificationActions.js');

var NotificationStore = Reflux.createStore({
  notifications: {},
  init: function() {
    this.listenTo(NotificationActions.create, this.onCreate);
    this.listenTo(NotificationActions.dismiss, this.onDismiss);
  },
  onCreate: function(notification) {
    var notificationId = Date.now();
    this.notifications[notificationId] = notification;
    this.trigger();
  },
  onDismiss: function(notificationId) {
    delete this.notifications[notificationId];
    this.trigger();
  },
  getNotifications: function() {
    return this.notifications;
  }
});

module.exports = NotificationStore;