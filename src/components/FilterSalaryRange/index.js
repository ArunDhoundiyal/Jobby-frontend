import {useContext} from 'react'
import {ToggleContext}  from '../ToggleContext'
import './index.css'

const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ];

const FilterSalaryRange = ({onChangeFilterSalaryRange}) => {
  const {toggle} = useContext(ToggleContext)
    const onChangeSalaryRange = (event) => {
      onChangeFilterSalaryRange(event)
    }
    return(
        <div className= {toggle ? 'dark-filter-container' : 'filter-container'}>
        <h1 className='employe-type-heading'>Salary Range</h1>
          {salaryRangesList.map((eachSalaryRange) => (
            <div key={eachSalaryRange.salaryRangeId} className='employement-filter-container'>
              <input
                type='radio'
                id={eachSalaryRange.salaryRangeId}
                name='salaryRange'
                value={eachSalaryRange.salaryRangeId}
                onChange={onChangeSalaryRange}
              />
              <label className="employement-label"  htmlFor={eachSalaryRange.salaryRangeId}>
                {eachSalaryRange.label}
              </label>
              <br />
            </div>
          ))}
        </div>
    )
}

export default FilterSalaryRange