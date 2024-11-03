import {observable} from "mobx";








const questionsStore = observable([

    {id: 1,

        title:'1Kak zovut koshky',
        type:'singleChoice',
        answers: [
            {value: 'businka', label: 'businka'},
            {value: 'murmuletka', label: 'murmuletka'},
            {value: 'Option 3', label: 'Option 3'},
        ],
        answer:[''],
        trueAnswer:3,
        isAnswered:false
    },
    {id: 2,

        title:'2Who is Delya',
        type:'multipleChoice',
        answers: [
            {value: 'businka2', label: 'businka2'},
            {value: 'murmuletka2', label: 'murmuletka2'},
            {value: 'Option 32', label: 'Option 32'},
        ],
        answer:[''],
        trueAnswer:'Businka',
        isAnswered:false
    },
    {id: 3,

        title:'3Who is Delya',
        type:'shortText',
        answer:[''],
        trueAnswer:'Businka',
        isAnswered:false
    },
    {id: 4,

        title:'4Who is Delya',
        type:'longText',
        answer:[''],
        trueAnswer:'Businka',
        isAnswered:false
    },

])


export default questionsStore