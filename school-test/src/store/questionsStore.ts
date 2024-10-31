import {observable} from "mobx";








const questionsStore = observable([

    {id: 1,

        title:'Kak zovut koshky',
        type:'singleChoice',
        answers: [
    {value: 'businka', label: 'businka'},
    {value: 'murmuletka', label: 'murmuletka'},
    {value: 'Option 3', label: 'Option 3'},
],
        answer:'',
        trueAnswer:3,
        isAnswered:false
    },
    {id: 2,

        title:'Who is Delya',
        type:'shortText',
        answer:'',
        trueAnswer:'Businka',
        isAnswered:false
    },
    {id: 3,

        title:'Who is Delya3',
        type:'shortText',
        answer:'',
        trueAnswer:'Businka',
        isAnswered:false
    },

])


export default questionsStore






