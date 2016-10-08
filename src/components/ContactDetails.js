import React from 'react';

export default class ContactDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      togleKey: false,
      name: '',
      phone: ''
    };
    this.handleTogle=this.handleTogle.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
  }
  handleKeyPress(e){
    if(e.charCode==13){
      this.handleTogle();
    }
  }
  handleTogle(){
    if(!this.state.togleKey){
      this.setState({
        name: this.props.data.name,
        phone: this.props.data.phone
      });
    }
    else{
      this.handleEdit();
    }
    this.setState({
      togleKey: !this.state.togleKey
    });
  }
  handleEdit(){
    this.props.onEdit(this.state.name,this.state.phone);
  }
  handleChange(e){
    let nextState=[];
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }
  render(){
    const Details = (
      <div>
        <p>이름 : {this.props.data.name}</p>
        <p>전화번호 : {this.props.data.phone}</p>
        <button onClick={this.handleTogle}>편집</button>
        <button onClick={this.props.onRemove}>삭제</button>
      </div>
    );
    const edit = (
      <div>
        <p>이름 : <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/></p>
        <p>전화번호 : <input type='text' name='phone' value={this.state.phone} onChange={this.handleChange}onKeyPress={this.handleKeyPress}/></p>
        <button onClick={this.handleTogle}>완료</button>
        <button onClick={this.props.onRemove}>삭제</button>
      </div>
    );
    const Blank = (<div>Not Selected</div>);
    return(
      <div>
        <h2>Contact Details</h2>
        <div>{this.props.isSelected ? this.state.togleKey ? edit:Details : Blank}</div>
      </div>
    )
  }
}
ContactDetails.defaultProps = {
  data: {
    name: '',
    phone: ''
  },
  isSelected: false,
  onEdit: ()=>{console.error('onEdit is not define')},
  onRemove: ()=>{console.error('onRemove is not define')}
}
ContactDetails.propTypes = {
  onEdit: React.PropTypes.func,
  onRemove: React.PropTypes.func
}
