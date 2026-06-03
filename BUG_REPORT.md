# BUG REPORT

## Overview

The provided `Debugging-assignment.js` contained multiple logical, syntax, validation, and API-related issues. All identified bugs were analyzed and corrected.

---

## Bug 1: Undefined Variable

### Original

```js
res.send(userList);
```

### Issue

`userList` was not defined.

### Fix

```js
res.send(allUsers);
```

---

## Bug 2: User Lookup Fails

### Original

```js
const user = users.find((u) => u.id === id);
```

### Issue

`req.params.id` is a string while `u.id` is a number.

### Fix

```js
const user = users.find((u) => u.id === Number(id));
```

---

## Bug 3: Missing Return Statement

### Original

```js
function getUserById(id) {
  const user = users.find((u) => u.id === id);
}
```

### Issue

Function did not return the user.

### Fix

```js
function getUserById(id) {
  return users.find((u) => u.id === Number(id));
}
```

---

## Bug 4: Incorrect Property Name

### Original

```js
notes.lenght;
```

### Issue

Typo in property name.

### Fix

```js
notes.length;
```

---

## Bug 5: Async Function Not Awaited

### Original

```js
const data = fetchExternalData();
```

### Fix

```js
const data = await fetchExternalData();
```

---

## Bug 6: Assignment Used Instead of Condition

### Original

```js
if (notes = [])
```

### Issue

Assignment operator used.

### Fix

```js
if (notes.length === 0)
```

---

## Bug 7: Invalid ID Generation Usage

### Original

```js
const newId = generateNoteId;
```

### Issue

Function reference stored instead of function result.

### Fix

```js
const newId = generateNoteId();
```

---

## Bug 8: Invalid Input Validation

### Original

```js
if (!title && !content)
```

### Issue

Allowed requests where either title or content was missing.

### Fix

```js
if (!title || !content)
```

---

## Bug 9: Non-Unique Note IDs

### Original

```js
Math.random() * 1000;
```

### Issue

Could generate duplicate IDs.

### Fix

```js
Date.now();
```

---

## Bug 10: Delete Note Lookup Fails

### Original

```js
notes.findIndex((n) => n.id === id);
```

### Issue

String vs Number comparison.

### Fix

```js
notes.findIndex((n) => n.id === Number(id));
```

---

## Bug 11: Delete Without Validation

### Issue

Attempting to delete a non-existing note could cause incorrect behavior.

### Fix

Added index validation before deletion.

---

## Bug 12: Undefined Variable

### Original

```js
user.name = username;
```

### Issue

`username` was undefined.

### Fix

```js
user.name = name;
```

---

## Bug 13: Incorrect Filter Condition

### Original

```js
notes.filter((n) => (n.userId = userId));
```

### Issue

Assignment used instead of comparison.

### Fix

```js
notes.filter((n) => n.userId === Number(userId));
```

---

## Bug 14: Authentication Logic

### Original

```js
if (email === "admin@test.com" || password === "123456")
```

### Issue

Login succeeded if either condition matched.

### Fix

```js
if (
  email === "admin@test.com" &&
  password === "123456"
)
```

---

## Bug 15: Profile Endpoint

### Original

```js
const user = users.filter(...)
res.send(user.name);
```

### Issue

`filter()` returns an array.

### Fix

```js
const user = users.find(...)
res.send(user);
```

---

## Bug 16: Sum Endpoint

### Original

```js
const total = a + b;
```

### Issue

Could concatenate strings.

### Fix

```js
const total = Number(a) + Number(b);
```

---

## Bug 17: Incorrect Port Message

### Original

```js
app.listen(3000);
console.log("Server running on port 5000");
```

### Issue

Port mismatch.

### Fix

```js
app.listen(3000);
console.log("Server running on port 3000");
```

---

## Improvements Added

- Better validation
- Type conversion handling
- Safer delete operations
- Consistent API behavior
- Improved error handling
- Cleaner code structure

## Total Bugs Fixed

17
