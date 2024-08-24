import { getStandings } from '../helperFn/handlers/codeforcesHandler';
getStandings('https://codeforces.com/group/MWSDmqGsZm/contest/219158/standings/friends/true').then((standings) => 
{
    console.log(standings); 
});