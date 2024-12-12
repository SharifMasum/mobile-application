import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import Container from '@mui/material/Container';
import { Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
 } from '@mui/material';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "shoppinglist-85f6e",
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState(0);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const fetchedItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(fetchedItems);
  };
  
  useEffect(() => {
    fetchItems();
  }, []);
  

  const addItem = async (e) => {
    if (itemName === '') {
      alert('Please enter valid item');
      return;
    }

    if (itemCount <= 0) {
      alert('Please enter valid number');
      return;
    }

    e.preventDefault();
    const item = { name: itemName, count: itemCount };
    const docRef = await addDoc(collection(db, 'items'), item);
    setItems([...items, { ...item, id: docRef.id }]);
    setItemName('');
    setItemCount(0);
  }

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };
  

  return (
  <Container maxWidth="xs">
    <Box style={styles.container}>
      <Typography 
      padding="20px"
      fontWeight="Bold" 
      variant="h4"
      color='purple'
      >
        Shopping List
      </Typography>
      <Box style={styles.inputBox}>
        <form onSubmit={addItem} style={styles.form}>
          <TextField
            label="Item"
            variant="outlined"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{ marginBottom: '5px', flex: 2 }}
            size="small"
          />
          <TextField
            type="number"
            label="Count"
            variant="outlined"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            style={{ marginBottom: '5px', flex: 1, marginLeft: '10px' }}
            size="small"
          />
          <IconButton
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginLeft: '10px'}}
          >
            ADD
          </IconButton>
        </form>
      </Box>

      <div style={styles.listBox}>
        <List style={styles.list}>
          {items.map((item) => (
            <Box key={item.id} style={styles.listItem}>
              <ListItem >
                <ListItemText primary={item.name} style={{ flex: 2 }} />
                <ListItemText primary={item.count} style={{ flex: 1 }} />
                <IconButton
                  onClick={() => deleteItem(item.id)}
                  variant="contained"
                  color="warning"
                  style={styles.deleteButton}
                >
                  X
                </IconButton>
              </ListItem>
            </Box>
          ))}
        </List>
      </div>
    </Box>
  </Container>
);
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#82b1ff',
    margin: '0 auto',
    width: '100%',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    color: '#f9f9f9',
    backgroundColor: '#e6ee9c',
    padding: '10px',
    borderRadius: '5px',
    width: '90%',
    marginBottom: '12px',
  },
  list: {
    width: '100%',
  },
  listBox: {
    width: '90%',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffc107',
    fontWeight: 'bold',
    borderRadius: '5px',
    marginBottom: '8px',
    width: '100%',
  },
  deleteButton: {
    marginLeft: '10px',
  },
};


export default App;
