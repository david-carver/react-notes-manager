import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import App from "App";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoteBrowse from "pages/NoteBrowse/NoteBrowse";
import PageNoteFound from "pages/PageNotFound/PageNoteFound";
import NoteCreate from "pages/NoteCreate/NoteCreate";
import Note from "pages/Note/Note";
import Signin from "pages/Signin/Signin";
import Signup from "pages/Signup/Signup";
import FirebaseApp from "utils/firebase";
import { PersistGate } from "redux-persist/integration/react";

FirebaseApp.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<App />}>
              <Route path="/" element={<NoteBrowse />} />
              <Route path="/note/:id" element={<Note />} />
              <Route path="/note/new" element={<NoteCreate />} />
              <Route path="*" element={<PageNoteFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
