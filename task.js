let bigintSum = (a, b) => {
  if (Number(a) < Number(b)) { let interim = a; a = b; b = interim }
  // larger num is above smaller

  let zeroes = ''
  let lengthDiff = a.length - b.length
  for (let i = 0; i < lengthDiff; i++) {
    zeroes += '0'
  }
  b = zeroes + b
  // pushing leading zeroes

  let c = ''
  needPlus1 = false
  // is includes memorized num?

  for (let k = a.length - 1; k > 0; k--) { 
    let sum = 0;
    if (needPlus1) sum = Number(a[k]) + Number(b[k]) + 1
    else sum = Number(a[k]) + Number(b[k])

    if (sum > 9) {
      c += sum % 10
      needPlus1 = true
    } else {
      c += sum % 10
      needPlus1 = false
    }
  }

  let lastSum = 0
  if (needPlus1) lastSum = Number(a[0]) + Number(b[0]) + 1
  else lastSum = Number(a[0]) + Number(b[0])

  c = lastSum + c.split('').reverse().join('')
  return c
}

let bigintMul = (a, b) => {
  if (Number(a) < Number(b)) { let interim = a; a = b; b = interim }
  if (Number(a) * Number(b) === 0) return '0'
  while (a[0] === '0') a = a.substring(1)
  while (b[0] === '0') b = b.substring(1)
  // removing incorrect input ("01", "001")

  b = '0'.repeat(a.length - b.length) + b

  let c = []
  
  for (let i = b.length - 1; i >= 0; i--) { 
    let interim = ''
    let mul = 0
    let remain = 0
    let needPlus = false

    for (let j = a.length - 1; j > 0; j--) { 
      mul = needPlus ? Number(b[i]) * Number(a[j]) + remain : Number(b[i]) * Number(a[j])
      if (mul > 9) {
        needPlus = true
        interim += mul % 10
        remain = Math.floor(mul / 10)
      } else {
        needPlus = false
        interim += mul % 10
      }
    }

    let lastMul = 0
    lastMul = needPlus ? Number(b[i]) * Number(a[0]) + remain : Number(b[i]) * Number(a[0])
    c.push(lastMul + interim.split('').reverse().join('') + '0'.repeat(b.length - 1 - i))
  }

  for (let i in c) {
    c[i] = '0'.repeat(c[c.length - 1].length - c[i].length) + c[i]
  }

  let result = []
  for (let i = c[0].length - 1; i > 0; i--) {
    let sum = 0
    for (let j in c) {
      sum += Number(c[j][i])
    }
    result.push(sum)
  }

  let memory = 0
  for (let i in result) {
    result[i] += memory
    memory = Math.floor(result[i] / 10)
    result[i] = (result[i] % 10).toString()
  }

  let finalSum = 0
  for (let m in c) {
    finalSum += Number(c[m][0]) 
  }
  finalSum += memory

  result = finalSum.toString() + result.reverse().join('') 
  while (result[0] === '0') result = result.substring(1)
  return result
}