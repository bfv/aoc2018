
import { Input } from './input';

class Event {
    time: string;
    guard: number;
    name: string;
    duration = 0;
}

class Guard {
    id: number;
    asleep: number;
}

let events = parseInput();
let guards = iterateEvents(events);

let sleepyestGuard = findSleepyestGuard(guards);
let minute = findSleepyestMinute(sleepyestGuard);

console.log('guard:', sleepyestGuard, 'minute:', minute);
console.log('day4a:', sleepyestGuard * minute);

function findSleepyestMinute(guard: number) {

    let minutes = new Array<number>(60);
    for (let i = 0; i < minutes.length; i++){
        minutes[i] = 0;
    }

    let guardsEvents = events.filter(event => event.guard == guard && event.name == 'wakes up');

    for (let event of guardsEvents) {
        let time = calcMinutes(event.time.split(' ')[1]);
        console.log(time, event.duration);
        for (let i = 0; i < event.duration; i++) {
            minutes[time - i]++;
        }
    }

    let max = 0;
    let index = -1;
    for (let i = 0; i < minutes.length; i++) {
        if (minutes[i] > max) {
            max = minutes[i];
            index = i;
        }
    }

    return index;
}

function findSleepyestGuard(guards: Object) {

    let max = 0, maxGuard = '';
    for (let guard in guards) {
        if (guards[guard] > max) {
            maxGuard = guard;
            max = guards[guard];
        }
    }

    return parseInt(maxGuard.replace('g', ''));
}

function iterateEvents(events: Event[]) {
    let guards = {};
    for (let i = 0; i < events.length; i++) {
        let index = 'g' + events[i].guard.toString();
        if (guards[index] === undefined) {
            guards[index] = 0;
        }
        guards[index] += events[i].duration;
    }
    return guards;
}

function parseInput(): Event[] {

    let events: Event[] = [];

    for (let i = 0; i < Input.data.length; i++) {
        events.push(parseEventString(Input.data[i]));
    }

    events = events.sort((a, b) => a.time.localeCompare(b.time));

    let currentGuard = 0;
    for (let i = 0; i < events.length; i++) {
        if (events[i].name == 'begins shift') {
            currentGuard = events[i].guard;
        }
        else {
            events[i].guard = currentGuard;
        }

        if (events[i].name == 'wakes up') {
            events[i].duration = calcDuration(events[i - 1].time, events[i].time);
        }
    }

    return events;
}

function parseEventString(eventString: string): Event {

    let event = new Event();
    let part1 = eventString.split(']');

    event.time = part1[0].substring(1);
    let rest = part1[1].substring(1).split(' ');
    if (rest[0].toLowerCase() == 'guard') {
        event.guard = parseInt(rest[1].replace('#', ''));
        event.name = 'begins shift';
    }
    else {
        event.name = rest[0] + ' ' + rest[1];
    }

    return event;
}

function calcDuration(from: string, till: string) {
    return (calcMinutes(till) - calcMinutes(from));
}

function calcMinutes(time: string) {
    let parts = time.split(':');
    return (parseInt(parts[0]) * 60 + parseInt(parts[1]));
}
