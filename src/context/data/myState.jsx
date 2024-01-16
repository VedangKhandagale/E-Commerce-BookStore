// import React, { useEffect, useState } from 'react'
// import MyContext from './myContext'
// import { QuerySnapshot, Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { fireDB } from '../../firebase/FirebaseConfig';
// // import { document } from 'postcss';

// function myState(props) {
//     const [mode,setMode]= useState('light');

//     const toggleMode = () => {
//         if(mode==='light'){
//            setMode('dark'); 
//            document.body.style.backgroundColor = "rgb(17, 24, 39)";
//         }
//         else{
//             setMode('light');
//             document.body.style.backgroundColor = "white"
            
//         }

//     }
    
//     const [loading , setLoading]=useState(false)

//     const [products , setproducts] = useState({
//       title:null,
//       price: null,
//       imageUrl: null,
//       category: null,
//       description: null,
//       time: Timestamp.now(),
//       date:new Date().toLocaleString(
//         "en-US",{
//           month:"short",
//           day:"2-digit",
//           year:"numeric"
//         }
//       )
//     });

//   const addProduct = async () => {
//     if(products.title==null||products.price==null||products.imageUrl==null||products.category==null||products.description==null){
//       return toast.error("All fields are required")
//     }

//     setLoading(true);

//     try{
//       const productRef = collection(fireDB,'products');
//       await addDoc(productRef,products);
//       toast.success("Added product successfully");
//       setTimeout(()=>{
//         window.location.href='/dashboard'
//       },1000)
//       getProductData();
//       setLoading(false);

//     }catch(error){
//       console.log(error);
//       setLoading(false)

//     }
//     setproducts("")
//   }

//   const [product,setproduct]= useState([]);

//   const getProductData = async () =>{
//     try{
//       setLoading(true)
//       const q = query(collection(fireDB,'products',orderBy('time')));
//       const data = onSnapshot(q,(QuerySnapshot)=>{
//         let productArray = [];
//         QuerySnapshot.forEach((doc)=>{
//           productArray.push({...doc.data(),id:doc.id})
//         })
//         setproduct(productArray)
//         setLoading(false)
//       })
//       return ()=> data
//     }catch(error){
//       console.log(error)
//       setLoading(false)

//     }

//   }
//   useEffect(()=>{
//     getProductData();
//   },[])
//   return (
//     <MyContext.Provider value={{mode, toggleMode,loading,setLoading,
//     products,setproducts,addProduct,product}}>
//         {props.children}
//     </MyContext.Provider>
//   )
// }

// export default myState

import React, { useEffect, useState } from 'react'
import MyContext from './myContext';

import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';


function MyState(props) {
  const [mode, setMode] = useState('light');  
  const [loading, setLoading] = useState(false); 

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product Added successfully")
      getProductData()
      setTimeout(()=>{
        window.location.href='/dashboard'
      },1000)
      // closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  const edithandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    setLoading(true)
    try{
      await setDoc(doc(fireDB,'products',products.id),products);
      toast.success("Product updated successfully");
      getProductData();
      setTimeout(()=>{
        window.location.href='/dashboard'
      },1000);
      setLoading(false)



    }catch(error){
      console.log(error);
      setLoading(false);
    }

  }

  const deleteProduct = async (item) => {
    
      try { 
        setLoading(true)
        await deleteDoc(doc(fireDB,'products',item.id),products);
        toast.success('Product Deleted successfully');
        getProductData();
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  }

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, 'order'))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    // getProductData();
    getOrderData()

  }, []);

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, 'users'))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    // getProductData();
    getUserData();

  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')



  return (
    <MyContext.Provider value={{ 
      mode, toggleMode, loading,setLoading,
      products, setProducts,addProduct,product,
      edithandle,updateProduct,deleteProduct,order,user
      ,searchkey,setSearchkey,filterType,setFilterType,
      filterPrice,setFilterPrice}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState