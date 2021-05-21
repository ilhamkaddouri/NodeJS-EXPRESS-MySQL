const {validatePassword} = require('../../validation/user')

test("returns false for empty passwords",()=>{
    expect(validatePassword("")).toBe(false)
})

test("returns false for password without numbers",()=>{
    expect(validatePassword("abAkiljlmn")).toBe(false)
})

test("returns false for password without length < 6",()=>{
    expect(validatePassword("ab23A")).toBe(false)
})

test("returns false for password without lower letter",()=>{
    expect(validatePassword("ABC67890")).toBe(false)
})

test("returns false for password without upper letters",()=>{
    expect(validatePassword("abc68229")).toBe(false)
})

test("returns true for password with lower, upper letters, numbers and length more than > 6",()=>{
    expect(validatePassword("abAc789o9")).toBe(true)
})
test("returns false for password with numbers, lower andupper letter but with length< 6",()=>{
    expect(validatePassword("aQE67")).toBe(false)

})