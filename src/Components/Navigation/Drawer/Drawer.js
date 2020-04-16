import React,{Component} from 'react';
import './Drawer.css';


const links=[1,2,3]

class Drawer extends Component{
   
    renderLinks(){
        return links.map((link,index)=>{
            return(
                <li key={index} className='tagA'>
                    {/* это <а> в будущем */}
                   Link {link} 
                </li>
            )
        })
    }

    render(){
         const cls=[
             'Drawer'
         ]
         
         if (!this.props.isOpen){
             cls.push('close')
         }

        return(
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>

        )
    }
}
export default Drawer