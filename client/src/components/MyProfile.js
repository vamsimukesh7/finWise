import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function MyProfile() {

  const [Year, setYear] = useState({
    Year: '',
    Link: ''
  });

  const [Month, setMonth] = useState({
    Expense: '',
    Month: '',
    Year: '',
    Description: '',
    Category: ''
  });

  const [ExpenseCategory, setExpenseCategory] = useState({
    Name: ''
  })

  const AddNewYear = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/AddNewYear", { ...Year })
        .then(result => {
          console.log(result)
          alert('New Year Added')
          window.location.reload();
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  const AddNewMonth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/AddNewMonth", { ...Month })
        .then(result => {
          console.log(result)
          alert('New Month Added')
          window.location.reload();
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  const AddNewExpenseCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/AddNewExpenseCategory", { ...ExpenseCategory })
        .then(result => {
          console.log(result)
          alert('New Expense Category Added')
          window.location.reload();
        })
        .catch(error => console.log(error))
    } catch (error) {
      console.log(error);
    }
  }

  const [AllYear, setAllYear] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/GetYear')
      .then(result => setAllYear(result.data))
      .catch(error => console.log(error))
  }, [])

  const [AllMonth, setAllMonth] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/GetMonth')
      .then(result => setAllMonth(result.data))
      .catch(error => console.log(error))
  }, [])

  const [AllExpenseCategories, setAlExpenseCategories] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/GetExpenseCategory')
      .then(result => setAlExpenseCategories(result.data))
      .catch(error => console.log(error))
  }, [])

  const DeleteYear = async (id) => {
    axios.delete('http://localhost:3001/DeleteYear/' + id)
      .then(result => {
        console.log(result)
        window.location.reload();
      })
      .catch(error => console.log(error))
  }

  const [EditYear, setEditYear] = useState({
    Year: '',
    Link: ''
  });

  const GetYear = async (id) => {
    axios.get('http://localhost:3001/GetYear/' + id)
      .then(result => setEditYear(result.data))
      .catch(error => console.log(error))
  }

  const EditYearInfo = async (id, e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/EditYearInfo/" + id, { ...EditYear })
        .then(result => {
          console.log(result);
          alert('Edited');
          window.location.reload();
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }


  const [SelectedYear, setSelectedYear] = useState({});

  const OpenYear = (year) => {
    setSelectedYear(year);
  }

  const CloseYear = (e) => {
    e.preventDefault();
    setSelectedYear({});
  }

  return (
    <div className='homepage'>

      <div className='YearlyCards'>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {AllYear && AllYear.slice().reverse().map((Element, idx) => (
  <div className="col"  >
    <div className="card shadow-sm YearCard slide-right" style={{ animationDelay: `${idx * 0.1}s` }} key={idx}>
      {Element.Link ?
        <img src={Element.Link} alt='...' /> :
        <img src='https://w0.peakpx.com/wallpaper/936/609/HD-wallpaper-happy-new-year-2020-piggy-bank-deposits-2020-money-savings-2020-concepts-finance-2020-business-2020-new-year.jpg' alt='...' />
      }
      <div className="card-body">
        <p className="card-text">Year - {Element.Year}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => OpenYear(Element)} data-bs-toggle="modal" data-bs-target="#ViewYearModal">View</button>
            <button type="button" className="btn btn-sm btn-outline-info" onClick={() => GetYear(Element._id)} data-bs-toggle="modal" data-bs-target="#EditYearModal">Edit</button>
          </div>
          <div className='d-flex align-items-center'>
            <small className="text-body-secondary me-3">{Element.Year}</small>
            <button className='btn btn-sm btn-outline-danger' onClick={() => DeleteYear(Element._id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
))}


        </div>

        {
          EditYear && (
            <div className="modal fade" id="EditYearModal" tabIndex="-1" aria-labelledby="EditYearModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={(e) => EditYearInfo(EditYear._id, e)}>
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="EditYearModalLabel">{EditYear.Year}</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body AddNew">
                      <label>Year:</label>
                      <input type='number' placeholder='Enter Year' value={EditYear.Year} onChange={(e) => setEditYear({ ...EditYear, Year: e.target.value })} />
                      <label>Image Link URL:</label>
                      <input type='url' placeholder='Enter the Card Image URL' value={EditYear.Link} onChange={(e) => setEditYear({ ...EditYear, Link: e.target.value })} />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )
        }


        {
          SelectedYear && (
            <div class="modal fade" id="ViewYearModal" tabindex="-1" aria-labelledby="ViewYearModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ViewYearModalLabel">{SelectedYear.Year}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body YearsData">
                    {
                      AllMonth &&
                      AllMonth.filter(month => month.Year === SelectedYear.Year)
                        .map((month, index) => (
                          <div key={index} className='MonthlyExpense'>
                            <label>{month.Month}</label>
                            <p>₹{month.Expense}</p>
                            <p>{month.Category}</p>
                            <p>{month.Description}</p>
                          </div>
                        ))
                    }
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onClick={CloseYear} data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div>


      <div className='container-fluid'>
        <div className='AddButtons'>
          <button className='btn btn-info' type='button' data-bs-toggle="modal" data-bs-target="#AddNewYearModal">Add New Year</button>

          <div class="modal fade" id="AddNewYearModal" tabindex="-1" aria-labelledby="AddNewYearModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={AddNewYear}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddNewYearModalLabel">Add New Year</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="AddNew modal-body">
                    <label>Year:</label>
                    <input type='number' placeholder='Enter Year' value={Year.Year} onChange={(e) => setYear({ ...Year, Year: e.target.value })} />
                    <label>Image Link URL:</label>
                    <input type='url' placeholder='Enter the Card Image URL' value={Year.Link} onChange={(e) => setYear({ ...Year, Link: e.target.value })} />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Add Year</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#ViewMonthModal">Add Month and Expense</button>


          <div class="modal fade" id="ViewMonthModal" tabindex="-1" aria-labelledby="ViewMonthModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={AddNewMonth}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="ViewMonthModalLabel">Month and Expense</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="AddNew modal-body">
                    <label>Expense:</label>
                    <input type='number' placeholder='Enter Expense in Rupees' value={Month.Expense} onChange={(e) => setMonth({ ...Month, Expense: e.target.value })} />
                    <label>Remark/Description:</label>
                    <input type='text' placeholder='Write any Description if Needed' value={Month.Description} onChange={(e) => setMonth({ ...Month, Description: e.target.value })} />
                    <label>Expense Category:</label>
                    <select placeholder='Select all the Categories' onChange={(e) => setMonth({ ...Month, Category: e.target.value })} >
                      <option>--Select--</option>
                      {
                        AllExpenseCategories && AllExpenseCategories.map((Element, idx) => {
                          return (
                            <option key={idx} value={Element.Name}>{Element.Name}</option>
                          )
                        })
                      }
                    </select>
                    <label>Year:</label>
                    <select type='number' placeholder='Enter Year' onChange={(e) => setMonth({ ...Month, Year: e.target.value })} >
                      <option>--Select--</option>
                      {
                        AllYear && AllYear.slice().reverse().map((Element, idx) => {
                          return (
                            <option key={idx} value={Element.Year}>{Element.Year}</option>
                          )
                        })
                      }
                    </select>
                    <label>Month:</label>
                    <select onChange={(e) => setMonth({ ...Month, Month: e.target.value })}>
                      <option >--Select--</option>
                      <option value='December'>December</option>
                      <option value='November'>November</option>
                      <option value='October'>October</option>
                      <option value='September'>September</option>
                      <option value='August'>August</option>
                      <option value='July'>July</option>
                      <option value='June'>June</option>
                      <option value='May'>May</option>
                      <option value='April'>April</option>
                      <option value='March'>March</option>
                      <option value='February'>February</option>
                      <option value='January'>January</option>
                    </select>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#AddNewExpenseCategoryModal">Add Expense Category</button>


          <div class="modal fade" id="AddNewExpenseCategoryModal" tabindex="-1" aria-labelledby="AddNewExpenseCategoryModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={AddNewExpenseCategory}>
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="AddNewExpenseCategoryModalLabel">Add Expense Category</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body AddNew">
                    <label>Category Name:</label>
                    <input type='text' placeholder='Enter Category Name' value={ExpenseCategory.Name} onChange={(e) => setExpenseCategory({ ...ExpenseCategory, Name: e.target.value })} />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <button className='btn btn-info disabled'>Add New Subscription</button>
        </div>
      </div>


    </div>
  )
}
