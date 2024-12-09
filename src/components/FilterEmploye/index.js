import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css';

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
];


const FilterEmploye = ({onChangeFilterEmploye}) => {
  const {toggle} = useContext(ToggleContext)
  const onChangeEmployeType = (event) => {
    onChangeFilterEmploye(event)
  }
  return (
      <div className= {toggle ? 'dark-filter-container' : 'filter-container'}>
      <h1 className='employe-type-heading'>Type of Employment</h1>
        {employmentTypesList.map((eachJobType) => (
          <div key={eachJobType.employmentTypeId} className='employement-filter-container'>
            <input
              type='checkbox'
              id={eachJobType.employmentTypeId}
              name={eachJobType.employmentTypeId}
              value={eachJobType.employmentTypeId} 
              onChange = {onChangeEmployeType}
            />
            <label className="employement-label" htmlFor={eachJobType.employmentTypeId}>
              {eachJobType.label}
            </label>
          </div>
        ))}
        
      </div>
      
    
  );
};

export default FilterEmploye;
