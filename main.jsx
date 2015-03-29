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
          <div className="col-md-12 text-center">
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
            items: [{
                      starred: false,
                      text: "This is my bubl that I made! This bubl can hold your notes and more.",
                    },
                    {
                      starred: true,
                      text: "Showing at 4:45pm Sunday"
                    }]};
  },
  componentDidMount: function() {
      this.setState({ mounted: true });
  },
  addBubl: function(e) {
    if (this.state.text) {
      var nextItems = this.state.items.concat([{
        text: this.state.text
      }]);
    }
    console.log(234);
    this.setState({ items: nextItems });
  },
  handleEdit: function() {

  },
  clearAndFocusInput: function() {
    //this.setState({items: ''}); // Clear the input
    // We wish to focus the <input /> now!
  },
  render: function() {
    if(this.state.mounted){
      var items = this.state.items.map(function(item, i) {
        return (
          <div key={i} className="bubl" onClick={this.handleEdit.bind(this, i)}>
            <Controls starred={item.starred}>&#x2606;</Controls>
            <p className="bubleContent">{item.text}</p>
          </div>
        );
      }.bind(this));
    }
    return (
       <ReactCSSTransitionGroup transitionName="example">
        <AddBubl />
        {items}
      </ReactCSSTransitionGroup>
    )
  }
});

var AddBubl = React.createClass({
  getInitialState: function() {
    return {text: ""};
  },
  onAdd: function() {
    //Bubls.addBubl(this.state.text);
    this.setState({text: ''});
    this.props.value = "";
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Enter a New Bubl..." />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onChange={this.onChange} onClick={this.onAdd}>Add</button>
        </span>
      </div>
    );
  }
});

var Controls = React.createClass({
  getInitialState: function() {
    return {starred: this.props.starred};
  },
  handleClick: function(e) {
    this.setState({starred: !this.state.starred});
  },
  render: function() {
    return (
       <div className={"star star-"+this.state.starred} onClick={this.handleClick}></div>
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