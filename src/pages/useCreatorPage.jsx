import { v4 } from "uuid"
import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { viewScreenId } from "../redux/screenSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../services/config"

// data
//import data from "../data/data.json"

const useCreatorPage = () => {
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(false)
  const [seatMap, setSeatMap] = useState(null)
  const [seatData, setSeatData] = useState(new Map())
  const [rowPrice,setrowPrice] = useState();
  const navigate = useNavigate();
  let data = {"seatMapData": [
  ]};
  const screenid = localStorage.getItem('screenid');//useSelector(viewScreenId);
  /**
   * Given an array of seat objects, groups the seats by their row and returns
   * a new Map where each key is a row name and each value is an array of seats
   * in that row.
   *
   * @param {ISeat[]} seats - The array of seat objects to group.
   */
  const groupByRow = seats => {
    
    return seats.reduce((acc, seat) => {
       
      const currentRow = acc.get(seat.row) || []

      acc.set(seat.row, [...currentRow, seat])

      return acc
    }, new Map())
  }

  useEffect(() => {
    
    const db_data =  axios.get(`${BASE_URL}/screens/${screenid}`).then(response=>{
     
      
      data = response.data;
      const { seatMapData, ...restData } = data


    setSeatMap(restData)

    setSeatData(groupByRow(seatMapData))

    setLoading(false)
    }).catch(err=>console.log(err))
    
  }, [])

  /**
   * Adds a new seat to the seat data.
   * Inserts a new space or seat to the left or right of a given seat.
   *
   * @param {string} row - The row identifier for the seat.
   * @param {string} seatId - The id of the seat to insert the new seat next to.
   * @param {ISeatType} type - The type of the new seat.
   * @param {IDirection} direction - The direction of the insertion.
   */
  const addSeatAction = (row, seatId, type, direction) => {
    setSeatData(prevSeatData => {
      const data = new Map(prevSeatData)
      let price = 0;
      
      if(parseInt(rowPrice)>0){
        price = rowPrice;
      }else{
        price = data.get(row)[0].price
      }
      
      const seats = data.get(row) || []
      const index = seats.findIndex(seat => seat.id === seatId)

      if (index === -1) return prevSeatData

      const newSeat = {
        id: v4(),
        row,
        label:
          type === "seat"
            ? (
                Math.max(
                  ...seats
                    .filter(seat => seat.type === "seat")
                    .map(seat => parseInt(seat.label, 10)),
                  0
                ) + 1
              ).toString()
            : "0",
        type: type,
        price : price
      }

      seats.splice(index + (direction === "right" ? 1 : 0), 0, newSeat)

      data.set(row, [...seats])

      return data
    })

    toast.success(`${type === "seat" ? "Seat" : "Space"} added successfully`)
  }

  /**
   * Adds a new seat to the specified row and seat ID in the given direction.
   *
   * @param {string} row - The row identifier where the seat will be added.
   * @param {string} seatId - The seat identifier adjacent to where the new seat will be added.
   * @param {ISeatType} type - The type of the new seat to add.
   * @param {IDirection} direction - The direction relative to the specified seat ID to add the new seat.
   */
  const addSeat = (row, seatId, type, direction) => {
    addSeatAction(row, seatId, type, direction)
  }

  /**
   * Updates the label of the seat with the given seat ID in the specified row.
   * Checks if the new name already exists in the row and prevents the update if so.
   *
   * @param {string} row - The row identifier where the seat label will be updated.
   * @param {string} seatId - The seat identifier of the seat to update.
   * @param {string} name - The new label for the seat.
   */
  const editSeatName = (row, seatId, name) => {
    setSeatData(prev => {
      const updated = new Map(prev)

      const seats = updated.get(row) || []

      if (seats.some(seat => seat.label === name && seat.id !== seatId)) {
        toast.error(`Seat name ${name} already exists in row ${row}`)

        return prev
      }

      updated.set(
        row,
        seats.map(seat =>
          seat.id === seatId ? { ...seat, label: name } : seat
        )
      )

      toast.success(`Seat name updated to ${name}`)

      return updated
    })
  }

  /**
   * Deletes a seat from the seat data.
   * Finds the row of the specified seatId and removes the seat from the row.
   *
   * @param {string} row - The row identifier where the seat will be deleted.
   * @param {string} seatId - The seat identifier to delete.
   */
  const deleteSeat = (row, seatId) => {
    setSeatData(prev => {
      const updated = new Map(prev)

      const seats = updated.get(row)?.filter(seat => seat.id !== seatId) || []

      if (seats.length === 0) {
        updated.delete(row)
      } else {
        updated.set(row, seats)
      }

      return updated
    })

    toast.success("Item deleted successfully")
  }

  /**
   * Adds a new empty row to the seat data.
   * Generates a unique row identifier and inserts an empty row into the seat data state.
   */
  const addEmptyRow = () => {
    setSeatData(prevSeatData => {
      const data = new Map(prevSeatData)

      const rowId = v4()
        .replace(/-/g, "")
        .slice(0, 12)

      const emptyRow = {
        id: v4(),
        row: `empty-${rowId}`,
        label: "0",
        type: "space"
      }

      data.set(emptyRow.row, [emptyRow])

      return data
    })

    toast.success("New row added successfully")
  }

  /**
   * Adds a new seated row to the seat data.
   * Generates a unique row identifier and inserts an empty row into the seat data state.
   *
   * @param {string} name - The row identifier where the seats will be added.
   */
  const addSeatedRow = (name,price) => {
    const normalizedInput = name.toLowerCase()

    const existingRow = Array.from(seatData.keys()).some(
      row => row.toLowerCase() === normalizedInput
    )

    if (existingRow) {
      toast.error(`Row with name ${name} already exists`, {
        icon: "😮"
      })

      return false
    }

    setSeatData(prevSeatData => {
      const data = new Map(prevSeatData)
      setrowPrice(price);
      const emptyRow = { id: v4(), row: name, label: "1", type: "seat",price }

      data.set(emptyRow.row, [emptyRow])

      return data
    })

    toast.success(`Row ${name} added successfully`)

    return true
  }

  /**
   * Updates the row label in the seat data.
   * This function is called whenever the user edits the name of an existing row.
   *
   * @param {string} name - The new name for the row.
   * @param {string} oldName - The old name for the row.
   */
  const editRowName = (name, oldName,price,oldprice) => {
    const normalizedInput = name.toLowerCase()

    const existingRow = Array.from(seatData.keys()).some(
      row => row.toLowerCase() === normalizedInput
    )

    if((name.toLowerCase() == oldName.toLowerCase()) && parseInt(price) != parseInt(oldprice)){
      setSeatData(prevSeatData => {
        const data = new Map()

        Array.from(prevSeatData.entries()).forEach(([row, seats]) => {
          if (row === name) {
            data.set(
              name,
              seats.map(seat => ({ ...seat,price }))
            )
          } else {
            data.set(row, seats)
          }
        })

        toast.success(`Row ${name} edited successfully`)

        return data
      })
    }else if (existingRow) {
      toast.error(`Row with name ${name} already exists`, {
        icon: "😮"
      })
    } else {
      
      setSeatData(prevSeatData => {
        const data = new Map()

        Array.from(prevSeatData.entries()).forEach(([row, seats]) => {
          if (row === oldName) {
            data.set(
              name,
              seats.map(seat => ({ ...seat, row: name,price }))
            )
          } else {
            data.set(row, seats)
          }
        })

        toast.success(`Row ${name} edited successfully`)

        return data
      })
    }
  }

  /**
   * Deletes a row from the seat data.
   * Finds the row of the specified row and removes it from the seat data state.
   *
   * @param {string} row - The row identifier to delete.
   */
  const deleteRow = row => {
    setSeatData(prevSeatData => {
      const data = new Map(prevSeatData)

      if (!data.delete(row)) {
        toast.error(`Row ${row} does not exist`)

        return prevSeatData
      }

      toast.success(`Row deleted successfully`)

      return data
    })
  }

  /**
   * Handles the drag end event by updating the seat data with the new row order.
   *
   * @param {DropResult} result - The result of the drag end event.
   */
  const handleOnDragEnd = ({ source, destination }) => {
    if (!destination || source.index === destination.index) return

    const data = Array.from(seatData.keys())

    const [movedRow] = data.splice(source.index, 1)

    data.splice(destination.index, 0, movedRow)

    setSeatData(new Map(data.map(row => [row, seatData.get(row) ?? []])))
  }

  /**
   * Updates the name of the current seat map.
   *
   * @param {string} name - The new name for the seat map.
   */
  const editMapName = name => {
    setSeatMap({ ...seatMap, name })

    toast.success(`Map name edited successfully`)
  }

  /**
   * Updates the stage label of the current seat map.
   *
   * @param {string} name - The new stage name for the seat map.
   */
  const editStageName = name => {
    setSeatMap({ ...seatMap, stageText: name })

    toast.success(`Stage label edited successfully`)
  }

  /**
   * Calculates the total number of seats across all rows.
   */
  const getTotalSeats = () =>
    Array.from(seatData.values())
      .flat()
      .filter(seat => seat.type === "seat").length

  /**
   * Saves the seat data.
   */
  const saveData = () => {
    const data = Array.from(seatData.values()).flat()

    const mergeSeatMap = { ...seatMap, seatMapData: data }
    console.log(mergeSeatMap);

    const formData = new FormData();
        formData.append('seats',JSON.stringify(mergeSeatMap));
        formData.append('screenid',screenid)
        axios.put(`${BASE_URL}/screens/seatdata`,formData,{
            headers: {
              'Content-Type': 'application/json',
          }
        }).then(res=>console.log(res)).catch(err=>console.log(err))

        setTimeout(() => {
          navigate('/screen/viewScreenlist');  
        }, 2000);
    toast.success('Seats are mapped');
    // eslint-disable-next-line no-console
    //console.log(mergeSeatMap)
  }

  /**
   * Resets the seat data to the initial state.
   */
  const resetData = () => setSeatData(groupByRow(data.seatMapData))

  /**
   * Toggles the preview mode on or off.
   */
  const togglePreview = () => setPreview(prev => !prev)

  const rows = Array.from(seatData?.entries())

  return {
    rows,
    loading,
    preview,
    seatMap,
    seatData,
    getTotalSeats,
    addSeat,
    deleteSeat,
    editSeatName,
    deleteRow,
    editRowName,
    addEmptyRow,
    addSeatedRow,
    editMapName,
    editStageName,
    saveData,
    resetData,
    togglePreview,
    handleOnDragEnd,
    rowPrice,
    setrowPrice
  }
}

export default useCreatorPage
