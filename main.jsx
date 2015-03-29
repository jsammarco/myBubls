/*global React, render*/

var App = React.createClass({
      render: function() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-4">
              </div>
              <div className="col-md-4 text-center">
                <h1>myBubls</h1>
              </div>
              <div className="col-md-4">
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Items />
              </div>
            </div>
          </div>
        );
      }
    });

    var Items = React.createClass({
      getInitialState: function() {
        return {items: []};
      },
      handleChange: function(e) {
        this.setState({items: e.target.value});
      },
      clearAndFocusInput: function() {
        this.setState({items: ''}); // Clear the input
        // We wish to focus the <input /> now!
      },
      render: function() {
        return (
           <div className="bubl">
              <Star>&#x2606;</Star>
              <p className="bubleContent">This is my bubl that I made! This bubl can hold your notes and more.</p>
            </div>
        );
      }
    });

    var Star = React.createClass({
      getInitialState: function() {
        return {enabled: false};
      },
      handleClick: function(e) {
        this.setState({enabled: !this.state.enabled});
      },
      render: function() {
        var enabled = this.state.enabled ? true : false;
        return (
           <div className={"star star-"+enabled} onClick={this.handleClick}></div>
        );
      }
    });
/*
    var Item = React.createClass({
      getInitialState: function() {
        return {userInput: ''};
      },
      handleChange: function(e) {
        this.setState({userInput: e.target.value});
      },
      clearAndFocusInput: function() {
        this.setState({userInput: ''}); // Clear the input
        // We wish to focus the <input /> now!
      },
      render: function() {
        return (
          <div>
            <div onClick={this.clearAndFocusInput}>
              Click to Focus and Reset
            </div>
            <input
              value={this.state.userInput}
              onChange={this.handleChange}
            />
          </div>
        );
      }
    });
*/
    React.render(<App/>, document.getElementById('app'))