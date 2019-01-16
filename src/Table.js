//Import Components and libraries
import React, { Component } from 'react';
import * as firebase from 'firebase';
import {Table,FormControl,FormGroup} from 'react-bootstrap';
//Create Component class
class TableData extends Component{
    //Create Constructor 
    constructor(props){
         super(props);
         //Defines Initial state
         this.state={tableName:props.name,rows:[],search:'',filteredRows:[],sort:'asc'};
         //Instanciate the functions
         this.LoadData= this.LoadData.bind(this);
         this.LoadColumns= this.LoadColumns.bind(this);
         this.LoadRows= this.LoadRows.bind(this);
         this.Search= this.Search.bind(this);
         this.Sort= this.Sort.bind(this);
     }
    //Function to prepare datas to mount on render
    componentDidMount(){
        //Creates firebase configuration object 
        var config = {
    apiKey: "AIzaSyAVxeL_3pxm8hNn0P4xobVu1m9hUmx1WWc",
    authDomain: "example1-6f0a9.firebaseapp.com",
    databaseURL: "https://example1-6f0a9.firebaseio.com",
    projectId: "example1-6f0a9",
    storageBucket: "example1-6f0a9.appspot.com",
    messagingSenderId: "357685722626"
  };
//Initialize database        
  firebase.initializeApp(config);
        //Query
       const rootRef= firebase.database().ref().child(this.state.tableName);//.orderByChild('Name').equalTo('Erick');
        rootRef.on('value',snap=>{
            //Set state rows from database source
        this.setState({
           rows:snap.val(),
           filteredRows:snap.val(),
            columns:Object.keys(snap.val()[0])
        });    
        });
    }
    LoadColumns(){
        if(this.state.rows[0]===undefined){
        return <th></th>
        }
        //console.log(Columns);
        return this.state.columns.map(function(item,i){
            return <th key={'thead'+i}>
                <text id={item} onClick={this.Sort}>{item}</text>
                <FormGroup>
            <FormControl type='test' onChange={this.Search} id={item} placeholder='Search'/>
                </FormGroup>
                </th>
        },this);
        
    }
    LoadRows(){
        //console.log(this.state);
        if(this.state.filteredRows==null){
            return <tr><td>No Data</td></tr>;
        }
        return this.state.filteredRows.map(function(item,i){
           return <tr key={'row'+i}>{this.LoadData(item)}</tr> 
        },this);
    }
    
    LoadData(item){
        //console.log(item);
        if(this.state.filteredRows===null){
            return <td>No Data</td>;
        }
        return this.state.columns.map(function(key,i){
            return <td key={'fiel'+i}>{item[key]}</td>
        });
    }
    Search(v){
        console.log(v.target.id);
        //console.log(x);
        this.setState({
            selectedSearch:v.target.id,
            search:v.target.value,
            filteredRows: this.state.rows.filter(value=> value[v.target.id].toString().toLowerCase().includes(v.target.value.toLowerCase()))
        });
    }            
    Sort(header){
        //console.log(header.target.id)
        if(this.state.sort==='asc'){
            this.setState({
            filteredRows:this.state.filteredRows.sort(function (a, b) {
  if (a[header.target.id] < b[header.target.id]) {
    return 1;
  }
  if (a[header.target.id] > b[header.target.id]) {
    return -1;
  }
  // a must be equal to b
  return 0;
}),
                sort:this.state.sort==='asc'? 'desc':'asc'
        });
            
        }
        else{
            this.setState({
            filteredRows:this.state.filteredRows.sort(function (a, b) {
  if (a[header.target.id] > b[header.target.id]) {
    return 1;
  }
  if (a[header.target.id] < b[header.target.id]) {
    return -1;
  }
  // a must be equal to b
  return 0;
}),
                sort:this.state.sort==='asc'? 'desc':'asc'
        });
        }
        
  
    }
    render(){
        return <div>
            <Table striped bordered condensed hover responsive>
            <thead>{this.LoadColumns()}</thead>
            <tbody>{this.LoadRows()}</tbody>
            </Table></div>;
    }
    
}

export default TableData;
