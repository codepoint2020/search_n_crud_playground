import {useState, useEffect} from 'react'; 

function App() {

  const [myData, setMyData] = useState([
    {
      firstname: "Jerome",
      lastname: "Morales",
      email: "j.morales@gmail.com",
      fulldata: function () {
        return this.firstname + this.lastname + this.email;
      }
    },

    {
      firstname: "John",
      lastname: "Smith",
      email: "j.smith@gmail.com",
      fulldata: function () {
        return this.firstname + this.lastname + this.email;
      }
    },

    {
      firstname: "Jim",
      lastname: "Doe",
      email: "doe@example.com",
      fulldata: function () {
        return this.firstname + this.lastname + this.email;
      }
    },

    {
      firstname: "Alex",
      lastname: "Beltran",
      email: "a.beltran@example.com",
      fulldata: function () {
        return this.firstname + this.lastname + this.email;
      }
    }

  ]);

  //search param
  const [searchTerm, setSearchTerm] = useState('');

  //function when changing searchbox
  const inputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const searchResult = myData.filter((criteria) => {
    return criteria.fulldata().toLowerCase().includes(searchTerm.toLowerCase());
  })

  //state for new firstname entered
  const [newFname, setNewFname] = useState('');
  //function for firstname onchange
  const changedFname = (event) => {
    setNewFname(event.target.value);
  }

  //state for new lastname entered
  const [newLname, setNewLname] = useState('');
  //function for lastname onchange
  const changedLname = (event) => {
    setNewLname(event.target.value);
  }

  //state for new email entered
  const [newEmail, setNewEmail] = useState('');
  //function for email onchange
  const changedEmail = (event) => {
    setNewEmail(event.target.value);
  }

  //function if form data is submitted
  const submitHandler = (event) => {
    event.preventDefault();
    let copyData = [...myData];
    let newEntry = {
      firstname: newFname, 
      lastname: newLname, 
      email: newEmail, 
      fulldata: function(){
        return this.firstname + this.lastname + this.email;
        }
      }
    copyData = [...copyData, newEntry];
    setMyData(copyData);
    setNewFname('');
    setNewLname('');
    setNewEmail('');
    console.log('new record added');
  }

  //function if form data is updated
  const updateHandler = (event) => {
    event.preventDefault();
      let id = targetId;
      let copyData = [...myData];
      let targetItem = copyData[id];

      targetItem.firstname = newFname;
      targetItem.lastname = newLname;
      targetItem.email = newEmail;
      setMyData(copyData);
      setNewFname('');
      setNewLname('');
      setNewEmail('');

      console.log('A record has been updated');
      setIsEditing(true);

  }

  // function if edit button is clicked
  const editHandler = (index) => {
    let copyData = [...myData];
    setTargetId(index);
    let targetItem = copyData[index];
    setNewFname(targetItem.firstname);
    setNewLname(targetItem.lastname);
    setNewEmail(targetItem.email);
    console.log('Editing Initiated' + targetItem.firstname);
    setIsEditing(false);
  }



  //state if editing or not
  const [isEditing, setIsEditing] = useState(true);


  //state for setting up id for targetted data for editing
  const [targetId, setTargetId] = useState(0);




  //function for deleting
  const deleteHandler = (index) => {
    let copyData = [...myData];
    copyData.splice(index, 1);
    setMyData(copyData);
    if (setMyData) {
      console.log('A record has been deleted');
    }
  }

  const cancelUpdate = () => {
    setNewFname('');
    setNewLname('');
    setNewEmail('');
    setTargetId(0);
    setIsEditing(true);
    console.log('Update canceled');
  }

  let cancelBtn;

  if (isEditing == false) {
    cancelBtn = <button className="btn btn-outline-secondary" type="button" onClick={cancelUpdate}>Cancel</button>
  }


  return (
      <div className="container my-4">
        <h1 className="text-center">Search and Crud Drill 1</h1>
        <div className="row">
          <div className="col-md-3">
              <form className="form-control mb-4" onSubmit={isEditing ? submitHandler : updateHandler}>
                <div className="mb-3">
                  <label className="form-label">Firstname</label>
                  <input type="text" className="form-control" onChange={changedFname} value={newFname}/>
                </div>

                <div className="mb-3">
                  <label className="form-label">Lastname</label>
                  <input type="text" className="form-control" onChange={changedLname} value={newLname} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input type="email" className="form-control" onChange={changedEmail} value={newEmail} />
                </div>

                <div className="d-grid gap-2">
                  {isEditing ? (
                    <button className="btn btn-primary">Submit</button>
                  ) : (
                      <button className="btn btn-info">Update</button>
                  )}
                   {cancelBtn}
                    
                  
                  
                  
                </div>
              </form>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4">
                <input className="form-control mb-4" type="text" onChange={inputChange} value={searchTerm} placeholder="Search" />
              </div>
              
              <table className="table table-striped table-hover">
                <thead className="table-info">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.firstname + " " + item.lastname}</td>
                      <td>{item.email}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(index)}>Del</button>
                        <button className="btn btn-sm btn-info mx-2" onClick={() => editHandler(index)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
  );
}

export default App;
