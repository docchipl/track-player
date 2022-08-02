var LinkToPlayer = function(props) {
    if(props.includes("https://") || props.includes("http://")){
        let domain = (new URL(props));
        let host = domain.hostname.replace('www.','').toLocaleLowerCase();
        let path = domain.pathname;
        
        let readyToSend;
        switch (host) {
            case 'cda.pl':
                path = path.split("/");

                readyToSend = path[2];
                break;
            case 'ebd.cda.pl':
                path = path.split("/");

                readyToSend = path[2];
                break;
            case 'drive.google.com':
                path = path.split("/");

                readyToSend = path[3];
                break;
            case 'mega.nz':
                if(!props.replaceAll('#','!').split("/")[4]){
                    path = props.replaceAll('#','!').split("/");

                    readyToSend = path[3].replaceAll('embed!!', '');
                }else{
                    path = props.replaceAll('#','!').split("/");

                    readyToSend = path[4]
                }
                break;
            default:
                readyToSend = props;
        }
        
        return (readyToSend);
    }else{
        return(props)
    }
}
export default LinkToPlayer;