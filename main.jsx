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

/* Bubls */
var Bubls = React.createClass({
  getInitialState: function() {
    var items = [];
    if (localStorage.items === undefined) {
      localStorage.setItem('items', JSON.stringify(
          [{
            "starred": false,
            "text": "This is my bubl that I made! This bubl can hold your notes and more.",
          },
          {
            "starred": true,
            "text": "Showing at 4:45pm Sunday"
          }]
      ));
    }
    items = JSON.parse(localStorage.getItem("items"));
    return {mounted: false,
            items: items};
  },
  componentDidMount: function() {
      this.setState({ mounted: true });
  },
  addBubl: function(text) {
    if (text) {
      var items = this.state.items.concat([{
        "starred": false,
        "text": text
      }]);
      this.setState({ items: items });
      localStorage.setItem('items', JSON.stringify(items));
      console.log(this.refs.textBox);
    }
  },
  toggleStarred: function(index, starred) {
    this.state.items[index] = {
      "starred": starred,
      "text": this.state.items[index].text
    };
    localStorage.setItem('items', JSON.stringify(this.state.items));
    this.setState({ items: this.state.items });
  },
  removeBubl: function(index) {
    items = JSON.parse(localStorage.getItem("items"));
    items.splice(index,1);
    this.setState({ items: items });
    localStorage.setItem('items', JSON.stringify(items));
  },
  handleEdit: function() {

  },
  clearAndFocusInput: function() {
    //this.setState({items: ''}); // Clear the input
    // We wish to focus the <input /> now!
  },
  render: function() {
    if(this.state.mounted && this.state.items.length > 0){
      var items = this.state.items.map(function(item, i) {
        return (
          <div className="bubl" onClick={this.handleEdit.bind(this, i)}>
            <Controls index={i} starred={item.starred} toggleStarred={this.toggleStarred} removeBubl={this.removeBubl} />
            <p className="bubleContent">{item.text}</p>
          </div>
        );
      }.bind(this));
    }
    return (
       <ReactCSSTransitionGroup transitionName="example">
        <AddBubl addBubl={this.addBubl} />
        {items}
      </ReactCSSTransitionGroup>
    )
  }
});

/* Add Bubl Form*/
var AddBubl = React.createClass({
  getInitialState: function() {
    return {text: ""};
  },
  onAdd: function(e) {
    e.preventDefault();
    this.props.addBubl(this.state.text);
    this.setState({text: ""});
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    var text = this.state.text;
    return (
      <form onSubmit={this.onAdd}>
      <div className="input-group">
        <input type="text" ref="textBox" value={text} onChange={this.onChange} className="form-control" autoFocus="true" placeholder="Enter a New Bubl..." />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.onAdd}>Add</button>
        </span>
      </div>
      </form>
    );
  }
});

/* Bubl Controls (Starred, etc...) */
var Controls = React.createClass({
  getInitialState: function() {
    return {starred: this.props.starred};
  },
  removeBubl: function(e) {
    this.props.removeBubl(this.props.index);
  },
  toggleStarred: function(e) {
    this.setState({starred: !this.state.starred});
    this.props.starred = this.state.starred;
    this.props.toggleStarred(this.props.index, !this.state.starred);
  },
  render: function() {
    return (
      <div className="controls">
        <div className={"star star-"+this.state.starred} onClick={this.toggleStarred}></div>
        <div className="remove" onClick={this.removeBubl}></div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'))