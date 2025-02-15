type StatusType = "Active" | "Inactive";

const dummyData = [
    { id: 1, name: "Device 1", accessTime: "12:00", status: "Active", removalTime: "12:30", date: "2025-02-14" },
    { id: 2, name: "Device 2", accessTime: "12:15", status: "Inactive", removalTime: "12:45", date: "2025-02-14" },
    { id: 3, name: "Device 3", accessTime: "12:30", status: "Active", removalTime: "13:00", date: "2025-02-14" },
    { id: 4, name: "Device 4", accessTime: "12:45", status: "Inactive", removalTime: "13:15", date: "2025-02-14" },
    { id: 5, name: "Device 5", accessTime: "13:00", status: "Active", removalTime: "13:30", date: "2025-02-14" },
    { id: 6, name: "Device 6", accessTime: "13:15", status: "Inactive", removalTime: "13:45", date: "2025-02-14" },
    { id: 7, name: "Device 7", accessTime: "13:30", status: "Active", removalTime: "14:00", date: "2025-02-14" },
    { id: 8, name: "Device 8", accessTime: "13:45", status: "Inactive", removalTime: "14:15", date: "2025-02-14" },
    { id: 9, name: "Device 9", accessTime: "14:00", status: "Active", removalTime: "14:30", date: "2025-02-14" },
    { id: 10, name: "Device 10", accessTime: "14:15", status: "Inactive", removalTime: "14:45", date: "2025-02-14" },
    { id: 11, name: "Device 11", accessTime: "14:30", status: "Active", removalTime: "15:00", date: "2025-02-14" },
    { id: 12, name: "Device 12", accessTime: "14:45", status: "Inactive", removalTime: "15:15", date: "2025-02-14" },
    { id: 13, name: "Device 13", accessTime: "15:00", status: "Active", removalTime: "15:30", date: "2025-02-14" },
    { id: 14, name: "Device 14", accessTime: "15:15", status: "Inactive", removalTime: "15:45", date: "2025-02-14" },
    { id: 15, name: "Device 15", accessTime: "15:30", status: "Active", removalTime: "16:00", date: "2025-02-14" },
    { id: 16, name: "Device 16", accessTime: "15:45", status: "Inactive", removalTime: "16:15", date: "2025-02-14" },
    { id: 17, name: "Device 17", accessTime: "16:00", status: "Active", removalTime: "16:30", date: "2025-02-14" },
    { id: 18, name: "Device 18", accessTime: "16:15", status: "Inactive", removalTime: "16:45", date: "2025-02-14" },
    { id: 19, name: "Device 19", accessTime: "16:30", status: "Active", removalTime: "17:00", date: "2025-02-14" },
    { id: 20, name: "Device 20", accessTime: "16:45", status: "Inactive", removalTime: "17:15", date: "2025-02-14" },
    { id: 21, name: "Device 21", accessTime: "17:00", status: "Active", removalTime: "17:30", date: "2025-02-14" },
    { id: 22, name: "Device 22", accessTime: "17:15", status: "Inactive", removalTime: "17:45", date: "2025-02-14" },
    { id: 23, name: "Device 23", accessTime: "17:30", status: "Active", removalTime: "18:00", date: "2025-02-14" },
    { id: 24, name: "Device 24", accessTime: "17:45", status: "Inactive", removalTime: "18:15", date: "2025-02-14" },
    { id: 25, name: "Device 25", accessTime: "18:00", status: "Active", removalTime: "18:30", date: "2025-02-14" },
    { id: 26, name: "Device 26", accessTime: "18:15", status: "Inactive", removalTime: "18:45", date: "2025-02-14" },
    { id: 27, name: "Device 27", accessTime: "18:30", status: "Active", removalTime: "19:00", date: "2025-02-14" },
    { id: 28, name: "Device 28", accessTime: "18:45", status: "Inactive", removalTime: "19:15", date: "2025-02-14" },
    { id: 29, name: "Device 29", accessTime: "19:00", status: "Active", removalTime: "19:30", date: "2025-02-14" },
    { id: 30, name: "Device 30", accessTime: "19:15", status: "Inactive", removalTime: "19:45", date: "2025-02-14" }
];


const tableHeaders = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Access Time", key: "accessTime" },
    { label: "Status", key: "status" },
    { label: "Removal Time", key: "removalTime" },
    { label: "Date", key: "date" }
];


export { dummyData, tableHeaders };