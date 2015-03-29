/*global React*/
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
                <Bubls />
              </div>
            </div>
          </div>
        );
      }
    });

    var Bubls = React.createClass({
      getInitialState: function() {
        return {mounted: false,
                items: [
                        "This is my bubl that I made! This bubl can hold your notes and more.",
                        "Showing at 4:45pm Sunday"
                        ]};
      },
      componentDidMount: function() {
          this.setState({ mounted: true });
      },
      handleChange: function(e) {
        //this.setState({items: e.target.value});
      },
      clearAndFocusInput: function() {
        this.setState({items: ''}); // Clear the input
        // We wish to focus the <input /> now!
      },
      render: function() {
        if(this.state.mounted){
          var items = this.state.items.map(function(item, i) {
            return (
              <div key={item} className="bubl" onClick={this.handleChange.bind(this, i)}>
                <Star>&#x2606;</Star>
                <p className="bubleContent">{item}</p>
              </div>
            );
          }.bind(this));
        }
        return (
           <ReactCSSTransitionGroup transitionName="example">
            {items}
          </ReactCSSTransitionGroup>
        )
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