export default {

    // ATTRIBUTES
    board: ['','','','','','','','',''],
    simbols: {
                options: ['X', 'O'],
                turn_index: 0,
                change: function(){
                    this.turn_index = ( this.turn_index === 0 ? 1:0 );
                }
            },
    gameover: false,
    velha: false,
    winning_sequences: [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                    ],

    // FUNCTIONS
    init: function(container) {
        this.container_element = container;
    },

    make_play: function(position) {
        if (this.gameover) return false;
        if (this.board[position] === ''){
            this.board[position] = this.simbols.options[this.simbols.turn_index];
            let winning_sequences_index = this.check_winning_sequences( this.simbols.options[this.simbols.turn_index] );
            if (winning_sequences_index >= 0){
                this.game_is_over();
            } else{
                this.simbols.change();
            }
            return true;
        }
        else {
            if (
                this.board[0] !== '' && 
                this.board[1] !== '' &&
                this.board[2] !== '' &&
                this.board[3] !== '' &&
                this.board[4] !== '' &&
                this.board[5] !== '' &&
                this.board[6] !== '' &&
                this.board[7] !== '' &&
                this.board[8] !== ''
            ) {
                this.game_is_velha();
            } else {
                return false;
            }
        }
    },

    check_winning_sequences: function(simbol) {

        for ( i in this.winning_sequences ) {
            if (this.board[ this.winning_sequences[i][0] ] == simbol  &&
                this.board[ this.winning_sequences[i][1] ] == simbol &&
                this.board[ this.winning_sequences[i][2] ] == simbol) {
                console.log('winning sequences INDEX:' + i);
                return i;
            }
        };
        return -1;
    },

    game_is_over: function() {
        this.gameover = true;
        console.log('GAME OVER');
    },

    game_is_velha: function() {
        this.velha = true;
        console.log('DEU VELHA')
    },

    start: function() {
        this.board.fill('');
        this.gameover = false;
        this.velha = false;     
    },
}; 
