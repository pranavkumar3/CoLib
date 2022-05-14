import React,{Component} from 'react';

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    return(
        <div className="container mt-4 home text-center align-self-center">
        <br/><br/><br/>
        <br/>  
        <br/>  
        <br/>  
            <div className="row mt-3 darkbg text-center justify-content-center">

            <h1 align="center"> Welcome to IIIT-B Library Portal</h1>
            </div>
            <div className="row darkbg">

        <br/><br/><br/>
        <br/><br/><br/>
            <h6>
            
            <br/><br/> </h6>
            </div>
            <div className="row darkbg justify-content-center">
                
            <table className="tbl">
    <tr> <th colspan={"4"} ><h6>Library Timings</h6></th> </tr>
    <tr> <td><h6>Library Opening Time</h6> </td> <td> <h6>9.00 A.M.</h6></td></tr>
    <tr> <td>Library Closing Time </td> <td> 11.00 P.M.</td></tr>
            </table>
            <br/>
            <br/>
                </div>
                <br/><br/>
                <br/><br/><br/>
            </div>
        );
}

}

export default Home;