import React from 'react';
export default class ContactCreate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      phone: ''
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }
  handleChange(e){
    const nextState = [];
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }
  handleClick(){
    const data = {
      name: this.state.name,
      phone: this.state.phone
    };
    this.props.onCreate(data);
    this.setState({
      name: '',
      phone: ''
    });
  }
  render(){
    return(
      <div>
        <h3>Create Contact</h3>
        <p>
          <input type='text'name='name' value={this.state.name} placeholder='name'onChange={this.handleChange}/>
          <input type='text'name='phone' value={this.state.phone} placeholder='phone'onChange={this.handleChange}/>
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    )
  }
}
ContactCreate.defaultProps ={
  onCreate: ()=>{console.error('onCreate not define');}
}
ContactCreate.propTypes = {
  onCreate: React.PropTypes.func
}
