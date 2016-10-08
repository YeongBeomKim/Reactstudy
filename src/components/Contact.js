import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';
export default class Contact extends React.Component{
  constructor(props){
    super(props);
    this.state={
      keyword: '',
      name: '',
      phone: '',
      comment: '',
      SelectedKey: -1,
      database: [
        {name: "YeongBeom", phone: "010-4940-5493", comment: "YBYBYB"},
        {name: 'HI', phone: "010-010-010", comment: "hihi"}
      ]
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.handleCreate=this.handleCreate.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }
  handleChange(e){
    this.setState({
      keyword: e.target.value
    });
  }
  handleClick(key){
    this.setState({
      name: this.state.name,
      phone: this.state.phone,
      SelectedKey: key
    });
  }
  handleCreate(data){
    this.setState({
      database: update(this.state.database,{$push: [data]})
    });
  }
  handleRemove(){
    this.setState({
      database: update(this.state.database,{$splice: [[this.state.SelectedKey,1]]}),
      SelectedKey: -1
    });
  }
  handleEdit(name,phone){
    this.setState({
      database: update(this.state.database,
        {
          [this.state.SelectedKey]: {
            name: {$set: name},
            phone: {$set: phone}
          }
        }
      ),
    });
  }
  render(){
      const mapToData =(database)=>{
        database.sort();
        database=database.filter(
          (data) => {
            return data.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
            /*indexOf() 는 같은게없으면 -1을 반환 */
          }
        );
        return database.map((data,i) => {
          return (<ContactInfo data={data} key={i} onClick={()=>{this.handleClick(i)}}/>)
        }
      )};
      return(
        <div>
          <input type='text' name='keyword' value={this.state.keyword} onChange={this.handleChange} placeholder='search' />
          <div>{mapToData(this.state.database)}</div>
          <ContactDetails
            isSelected={this.state.SelectedKey != -1}
            data={this.state.database[this.state.SelectedKey]}
            onRemove={this.handleRemove}
            onEdit={this.handleEdit}
          />
          <ContactCreate onCreate={this.handleCreate}/>
        </div>
      )
  }
};
