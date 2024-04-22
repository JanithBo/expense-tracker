'use client'
import { useState, useEffect } from "react";
import { db } from './firebase';
import { collection, addDoc, getDoc, QuerySnapshot, query, onSnapshot,deleteDoc,doc } from "firebase/firestore";


export default function Home() {
  const [items, setItems] = useState([
    //{ name: 'Coffee', price: 4.95 },
    //{ name: 'Movie', price: 24.95 },
    //{ name: 'Candy', price: 7.95 },
  ]);
  const [total, setTotal] = useState(0);
  const [newItem, setNewItem] = useState({
    name: '',
    price: ''
  });

  // Update total whenever items change
  useEffect(() => {
    const newTotal = items.reduce((acc, curr) => acc + curr.price, 0);
    setTotal(newTotal);
  }, [items]);

  // Add item to items array
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      //setItems([...items, newItem]);
      await addDoc(collection(db,'items'),{
        name:newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: '', price: '' });
    }
  }

  //Read items from databse
  useEffect(() =>{
    const q =query(collection(db,'items'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot)=>{
      let itemsArr = []
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(),id:doc.id})
      })
      setItems(itemsArr)

      //Read toatal itemsArray
      const calculateTotal = () =>{
        const totalPrice = itemsArr.reduce((sum,item) => sum +parseFloat(item.price),0)
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubscribe();
    });
  },[])


  // Delete item from items from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className='col-span-3 p-3 border'
              type='text'
              placeholder='Enter Item'
            />
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              className='col-span-2 p-3 border mx-3'
              type='number'
              placeholder='Enter $'
            />
            <button
              onClick={addItem}
              className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
              type='submit'
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className='my-4 w-full flex justify-between bg-slate-950'>
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'>X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
