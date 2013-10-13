Yesterday I started working on [Project Euler](http://projecteuler.net/).

> Project Euler is a series of challenging mathematical/computer programming problems that will require more than just mathematical insights to solve. Although mathematics will help you arrive at elegant and efficient methods, the use of a computer and programming skills will be required to solve most problems.

In other words, it's geek crack.  I started with the first problem at 10pm last night and before I knew it, it was 2am.

Here are my solutions for the first 11 problems:

## [Problem 1](http://projecteuler.net/index.php?section=problems&id=1)

```python
x = 0

for i in range(1, 1000):
    if i % 3 == 0 or i % 5 == 0:
        x = x + i

print x
```

## [Problem 2](http://projecteuler.net/index.php?section=problems&id=2)

```python
def fib():
    x = 0
    a,b = 0,1
    while a <= 4000000:
        if a % 2 == 0:
            x = x + a
        a,b, = b,a+b
    print x

print fib()
```

## [Problem 3](http://projecteuler.net/index.php?section=problems&id=3)

```python
from math import sqrt

def largest_prime(n):
    for i in range(int(sqrt(n)) + 1, 2, -2):
        if n % i == 0:
            if is_prime(i):
                return i

def is_prime(n):
    n = abs(int(n))
    if n < 2:
        return False
    if n == 2:
        return True
    if not n & 1:
        return False
    for i in range(3, int(sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

n = 600851475143
print largest_prime(n)
```

## [Problem 4](http://projecteuler.net/index.php?section=problems&id=4)

```python
def is_palindrome(n):
    x = str(n)
    y = len(x)

    if (y == 1):
        return True

    for j in range(0, y / 2):
        if x[j] != x[y - j - 1]:
            return False
    return True

def largest_palindromic_product(min, max):
    maxProduct = 0
    for i in range(max, min, -1):
        for j in range(max, min, -1):
            x = i * j
            if is_palindrome(x):
                if x > maxProduct:
                    maxProduct = x
    return maxProduct

print largest_palindromic_product(99, 999)
```

## [Problem 5](http://projecteuler.net/index.php?section=problems&id=5)

```python
def is_divisible(n, x):
    for i in range(n, 2, -1):
        if x % i != 0:
            return False
    return True

x = 0
while True:
    x = x + 20
    if is_divisible(20, x):
        print x
        break
```

## [Problem 6](http://projecteuler.net/index.php?section=problems&id=6)

```python
def sum_of_squares(n):
    return reduce(lambda x, y: x + (y * y), range(1, n + 1))

def square_of_sums(n):
    x = reduce(lambda x, y: x + y, range(1, n + 1))
    return x * x

def diff_sums(n):
    return square_of_sums(n) - sum_of_squares(n)

print diff_sums(100)
```

## [Problem 7](http://projecteuler.net/index.php?section=problems&id=7)

```python
x = 0
y = 0
while x < 10001:
    if is_prime(y):
        x = x + 1
    y = y + 1

print y - 1
```

## [Problem 8](http://projecteuler.net/index.php?section=problems&id=8)

```python
def numbers_at_index(n):
    return map(lambda x: int(number[x]), range(n, n + 5))

def product_at_index(n):
    return reduce(lambda x, y: x * y, numbers_at_index(n))

print max(map(product_at_index, range(995)))
```

## [Problem 9](http://projecteuler.net/index.php?section=problems&id=9)

```python
# brute force, baby!

def is_pythagorean_triplet(a, b, c):
    if (a * a) + (b * b) == (c * c):
        return True
    return False

def find():
    for i in range(1, 1001):
        for j in range(i, 1001):
            for k in range(j, 1001):
                if (i + j + k == 1000):
                    if is_pythagorean_triplet(i, j, k):
                        return i * j * k
print find()
```

## [Problem 10](http://projecteuler.net/index.php?section=problems&id=10)

```python
print sum(filter(is_prime, range(1, 2000000)))
```


## [Problem 11](http://projecteuler.net/index.php?section=problems&id=11)

```python
import operator
grid = [8,2,22,97,38,15,0,40,0,75,4,5,7,78,52,12,50,77,91,8,49,49,99,40,17,81,18,57,60,87,17,40,
        98,43,69,48,4,56,62,0,81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,3,49,13,36,65,52,70,95,
        23,4,60,11,42,69,24,68,56,1,32,56,71,37,2,36,91,22,31,16,71,51,67,63,89,41,92,36,54,22,40,
        40,28,66,33,13,80,24,47,32,60,99,3,45,2,44,75,33,53,78,36,84,20,35,17,12,50,32,98,81,28,
        64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70,67,26,20,68,2,62,12,20,95,63,94,39,63,8,
        40,91,66,49,94,21,24,55,58,5,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72,21,36,23,9,
        75,0,76,44,20,45,35,14,0,61,33,97,34,31,33,95,78,17,53,28,22,75,31,67,15,94,3,80,4,62,16,
        14,9,53,56,92,16,39,5,42,96,35,31,47,55,58,88,24,0,17,54,24,36,29,85,57,86,56,0,48,35,71,
        89,7,5,44,44,37,44,60,21,58,51,54,17,58,19,80,81,68,5,94,47,69,28,73,92,13,86,52,17,77,4,
        89,55,40,4,52,8,83,97,35,99,16,7,97,57,32,16,26,26,79,33,27,98,66,88,36,68,87,57,62,20,72,
        3,46,33,67,46,55,12,32,63,93,53,69,4,42,16,73,38,25,39,11,24,94,72,18,8,46,29,32,40,62,76,
        36,20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,4,36,16,20,73,35,29,78,31,90,1,74,
        31,49,71,48,86,81,16,23,57,5,54,1,70,54,71,83,51,54,69,16,92,33,48,61,43,52,1,89,19,67,48]

def right(n):
    if n / 20 != n + 3 / 20: return 0
    return reduce(operator.mul, grid[n : n + 4])

def down(n):
    if n + 60 > 399: return 0
    return reduce(operator.mul, grid[n : n + 61 : 20])

def vright(n):
    if n / 20 != n + 3 / 20: return 0
    if n + 63 > 399: return 0
    return reduce(operator.mul, grid[n : n + 65 : 21])

def vleft(n):
    if n / 20 != n - 3 / 20: return 0
    if n + 57 > 399: return 0
    return reduce(operator.mul, grid[n : n + 58 : 19])

print max(map(lambda i : max(right(i), down(i), vright(i), vleft(i)), range(400)))
```
