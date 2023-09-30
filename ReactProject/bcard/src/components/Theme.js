import { createGlobalStyle } from 'styled-components';

export const Theme = createGlobalStyle`
.Card3 {
    background-image: ${(props) => (props.darkMode ? 'linear-gradient(#6d636345 , #161313c7)' : 'linear-gradient(#ccd0d8, #ccd0d8, #dee4eb, #d4d8da)')};
   p {
    color: ${(props) => (props.darkMode ? '#bbb3a3' : 'rgb(13, 44, 43)')};
}
h1 {
    color: ${(props) => (props.darkMode ? '#0a86b7' : 'rgb(13, 44, 43)')};
}

} 
body {
    background-color:${(props) => (props.darkMode ? '#010612fc' : 'white')};

  .title8 {  
    h1 {
        color: ${(props) => (props.darkMode ? '#ffffeae6' : 'rgba(5, 2, 41, 0.904)')};
    }
    p {
        color: ${(props) => (props.darkMode ? '#ffffeae6' : 'rgba(5, 2, 41, 0.904)')};
    }
}   
    }

.myIcons {
    a {
        color: ${(props) => (props.darkMode ? 'rgb(51, 49, 49)' : 'rgb(13, 44, 43)')};
    }
}
.options2 .actions  button{
    background-color:${(props) => (props.darkMode ? '#1c1919' : 'rgb(204, 211, 231)')};
    color: ${(props) => (props.darkMode ? 'white' : 'black')};
}
.options2 .submitG{
    background-color:${(props) => (props.darkMode ? '#1c1919' : 'rgb(204, 211, 231)')};
    color: ${(props) => (props.darkMode ? 'white' : 'black')};
}
.container2 input  {
    background-color:${(props) => (props.darkMode ? '#2b2b2b' : '#fafafa94')};
    color: ${(props) => (props.darkMode ? '#e9e8da' : 'black')};
    border:${(props) => (props.darkMode ? '2px solid rgb(10 24 143)' : '2px solid rgba(26, 35, 112, 0.897)')};
}
.container2 label {
    color: ${(props) => (props.darkMode ? '#e9e9d1e6' : 'rgb(34, 5, 48)')};
}
.container2 h2 {
    color: ${(props) => (props.darkMode ? '#e9e9d1e6' : 'rgba(31, 12, 83, 0.788)')};
}
.one-card-frame {
    background-color:${(props) => (props.darkMode ? '#a58a6300' : 'white')};
}
.one-card {
    background-image: ${(props) => (props.darkMode ? 'linear-gradient(#000000b8 , #0000008f)' : 'linear-gradient(#ccd0d8, #ccd0d8, #dee4eb, #d4d8da)')};
    p {
        color: ${(props) => (props.darkMode ? '#d7d0c2' : 'rgb(13, 44, 43)')};
    }
    b {
        color: ${(props) => (props.darkMode ? '#d3d3c0' : 'rgb(13, 44, 43)')};
    }
    h1 {
        color: ${(props) => (props.darkMode ? '#958670' : 'rgb(13, 44, 43)')};
    }
}
.addCard1 {
    background-color:${(props) => (props.darkMode ? '#a58a6300' : 'white')};
}
.btnMode {
    background-color:${(props) => (props.darkMode ? '#332f2fbf' : '#4b63a5')};
    color: ${(props) => (props.darkMode ? '#ffffea' : 'white')};
    border-radius:50%;
    width:40px;
    height:40px;
    font-size:18px;
    cursor:pointer;
    border:none;
}
.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    color: ${(props) => (props.darkMode ? '#ffffea' : 'black')};
}
.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: ${(props) => (props.darkMode ? 'drakblue' : 'black')};
}
.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    color: ${(props) => (props.darkMode ? '#ffffea' : 'black')};
}
.fieldError {
    color: ${(props) => (props.darkMode ? 'red' : 'red')};
}
.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    background-color:${(props) => (props.darkMode ? '#2b2b2b' : 'white')};
}
.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root {
    color: ${(props) => (props.darkMode ? 'white' : 'black')};
}
.css-1jy569b-MuiFormLabel-root-MuiInputLabel-root {
    color: ${(props) => (props.darkMode ? 'white' : 'black')};
}
.big-container {
    tr {
        background-color:${(props) => (props.darkMode ? '#1e1e1e' : 'rgb(223, 223, 223)')};
        color: ${(props) => (props.darkMode ? '#fff6e3' : 'black')};
    }
    tr:nth-child(even) {
        background-color:${(props) => (props.darkMode ? '#434343' : '#d3d2d2')};
        color: ${(props) => (props.darkMode ? '#fff6e3' : 'black')};
    }
    thead tr {
        background-color: #131314;
        color: #2fadcf;  
    }
    .icons .delete {
        color: ${(props) => (props.darkMode ? '#9f9e9e' : '#222020c5')};
    }
    .icons .delete:hover {
        cursor: pointer;
        transition: 0.2s;
        color: #b10808;
    }
    .icons a {
        color: ${(props) => (props.darkMode ? '#9f9e9e' : '#222020c5')};
    }
    .icons .edit:hover {
        cursor: pointer;
        transition: 0.2s;
        color: ${(props) => (props.darkMode ? '#c3932e' : 'darkorange')};
    }
    .aboutContainer h2{
        color: ${(props) => (props.darkMode ? 'white' : '#02331af6')};
    }

}

`