export const Role = {
    ADMIN: 'admin',
    USER: 'user'
}

export const roleOptions = [{ key: "USER", value: "USER", text: "User" }, { key: "ADMIN", value: "ADMIN", text: "Admin" }]

export const statusOptions = [{ key: "ACTIVE", value: "ACTIVE", text: "Active" }, { ley: "INACTIVE", value: "INACTIVE", text: "Inactive" }, { ley: "deleted", value: "deleted", text: "Deleted" }]

export const examTakenStatusOptions = [{ key: "DONE", value: "DONE", text: "Done" },
{ key: "WAITING", value: "WAITING", text: "Waiting" },
{ key: "CANCELLED", value: "CANCELLED", text: "Cancelled" },
{ key: "POSTPONED", value: "POSTPONED", text: "Posponed" },
{ key: "IN_PROGRESS", value: "IN_PROGRESS", text: "In Progress" }]
