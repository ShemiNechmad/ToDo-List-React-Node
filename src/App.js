import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
  
    super(props);
    this.state = {items:[{value : "", marked :true}], add:"",exget:[{value:"a",marked:true}],expost:""};
    this.add = this.add.bind(this);
  }

  componentDidMount(){
    this.callApi()
    .then (res => this.setState ({items: res.express}))
    .catch (err => console.log (err));
  }

  callApi = async () => {
    const response = await fetch ('/api/getter');
    const body = await response.json();
    if (response.status !==200) throw Error (body.message);
    return body;
  }

  posttodo = async e => {
    //e.preventDefault();
    const response = await fetch('/api/poster',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({post:e})
    });
    const body = await response.text();
    this.setState({expost: "added: "+body});
  }

  updatecheck = async (e,index) =>{
    await fetch('/api/checkboxer',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({marked:e, index:index})
    });
  }

  apiDelete = async (e) =>{
      await fetch('/api/deleter',{
        method:'POST', headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({e:e})
      });

  }

  apiUpdate = async (line,index) =>{
    await fetch('/api/updater',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({line:line, index:index})
    });
  }

  add(){

        const list = this.state.items.concat({value:this.state.add , marked:false}); 
        this.setState({items: list,add:""});
        this.posttodo(this.state.add);
  }
  delete(e){
    const list = this.state.items.filter((item,j)=>e !==j);
    this.setState({items: list});
    this.apiDelete(e)
  }

  updating(b,e,index){
    if (e==='Enter') {
      const list=this.state.items;
      list[index]['value']=b;
      this.setState({items:list}); 
      this.apiUpdate(b,index);
    }
  }

handleChangeChk(i){
  var item = this.state.items[i]['marked'];
  if (item) item=false; else item=true;   
  //this.setState ({expost: i + ': ' +item});
  var items = this.state.items;
  items[i]['marked'] = item;
  this.setState({items:items});
  this.updatecheck(item,i);
  }


 
 
  
  render(){
 
   //const items = this.state.items;
    const list =this.state.items.map((item,index)=>
    <div className="item" key={item.value}>


<table>
  <colgroup>
      <col width="90%"/>
      <col width="5%"/>
      <col width="4%"/>
      </colgroup>
      <tbody>
      <tr>
        <td > <input className="singleitem" type="text" defaultValue={item.value} onKeyPress={e=>this.updating(e.target.value,e.key,index)} /> </td>
        <td> <input type="checkbox" className="checkbox"  defaultChecked={item.marked} onChange={e=>this.handleChangeChk(index)}/></td>
        <td> <span className="checkbox" onClick={e => this.delete(index)}>X</span></td>
      </tr>
      </tbody>
   </table>
    </div>);

  return (
    
    <div className="App-header">
      <br/>
      
      <h1>ToDo List Yayy</h1>
      <br/>
      <div className="spanadd">
      <span>
      <input className="inputadd" type="text" placeholder="Add something you wanna do" value={this.state.add} onChange={e => this.setState({ add: e.target.value })}/>
      <button className="buttonadd" onClick={this.add}>Add</button>

      
      </span>
      <br/>
      <br/>
    <div className="tablediv"> 
      <div className="item">  
      </div>
      <table>
     
        <colgroup>
      <col width="90%"/>
      <col width="5%"/>
      <col width="4%"/>
      </colgroup>
      <tbody>
      <tr>
        <th >I need to...</th>
        <th>V</th>
        <th>X</th>
      </tr>
      </tbody>
      </table>
      
    {list}
   
    </div>
  </div>
    
  </div>
  );
}
}
export default App;
