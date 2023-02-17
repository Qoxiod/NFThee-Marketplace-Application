import { Component } from "react";


export class ErrorBoundries extends Component{
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }
    static getDerivedStateFromError(error){
        return{
            hasError:true
        }
    }
    componentDidCatch(error,errorInfo){
        console.log('error',error,errorInfo)
    }
    render(){
        if(this.state.hasError){
            return<h1>Something wends wrong</h1>
        }
        return this.props.children
    }
}