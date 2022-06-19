import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart.component";

const Form = () => {
    const [data, setData] = useState([])

    useEffect(() => {
      axios.get('https://dv-project-kamal.herokuapp.com/finds').then(res=>res.data).then(json=>setData(json))
    }, [])

    const [vars, setVars] = useState({
        variable: '',
        filter: '',
        filterUniqueVal : []
    })

    const onVariableChange = (e) => {
        setVars({
            ...vars,
            variable: e.target.value
        })
    }

    const onFilterChange = (e) => {
        setVars({
            ...vars,
            filter: e.target.value 
        })
    }

    const [vdata, setVdata] = useState({
        unq_fil_val: [],
        avg_val:[]
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const unq_val = []
        const avg_var_val = []
    
        if(data.length > 0){
            // Finding unique values in the filter
            for(let i = 0; i < data.length -1; i++){
                if(data[i][`${vars.filter}`] === undefined || data[i][`${vars.filter}`] === null){
                    continue;
                }
                else if(unq_val.includes(data[i][`${vars.filter}`])){
                    continue;
                }
                else{
                    unq_val.push(data[i][`${vars.filter}`]);
                }
            }

            // Finding the average of the values having same filter value
            for(let z = 0; z <= unq_val.length - 1; z++){
                const dat = []
                let val = 0
                for(let i = 0; i <= data.length - 1;i++){
                    if(data[i][`${vars.filter}`] === unq_val[z]){
                        if(data[i][`${vars.variable}`] == null){
                            continue;
                        }
                        else{
                            dat.push(data[i][`${vars.variable}`])
                        }
                    }
                }
                if(dat.length > 0){
                    for(let j = 0; j<= dat.length - 1; j++){
                        val = val + Number.parseInt(dat[j])
                    }
                }
                avg_var_val.push(val/dat.length)
            }

            setVdata({
                ...vdata,
                unq_fil_val: unq_val,
                avg_val: avg_var_val
            })
        }else{
            console.log("no data")
        }
    }

  return (
    <>
    <div className="container p-3">
        <form onSubmit={onSubmit}>
        <div className="row">
        <div className="col-12 my-2 my-md-0 col-md-6 d-flex justify-content-center">
            <div className="form-group">
                <label htmlFor="variable">Select a variable:</label>
                <select name="variable" onChange={onVariableChange}>
                    <option default>Select</option>
                    <option value="intensity">Intensity</option>
                    <option value="likelihood">Likelihood</option>
                    <option value="relevance">Relevance</option>
                </select>
            </div>
        </div>
        <div className="col-12 my-2 my-md-0 col-md-6 d-flex justify-content-center">
                <div className="form-group">
                <label htmlFor="filter">Filter:</label>
                <select name="filter" onChange={onFilterChange}>
                    <option default>Select</option>
                    <option value="end_year">End-Year</option>
                    <option value="start_year">Start-Year</option>
                    <option value="topic">Topic</option>
                    <option value="sector">Sector</option>
                    <option value="pestle">PEST</option>
                    <option value="source">Source</option>
                    <option value="country">Country</option>
                    <option value="region">Region</option>
                </select>
            </div>
        </div>
        </div>
        <div className="col-12 my-3">
            <div className="form-group d-flex justify-content-center">
                <input type="submit" value="Submit" className="btn btn-primary w-50" />
            </div>
        </div>
    </form>
    </div>
    <div className="container my-5 align-center">
        {
            vdata.unq_fil_val.length > 0 && vdata.avg_val.length > 0 ? <Chart variable={vars.variable} filter={vars.filter} filterData={vdata.unq_fil_val} variableData={vdata.avg_val}/> : ""
        }
    </div>
    </>
  )
}

export default Form