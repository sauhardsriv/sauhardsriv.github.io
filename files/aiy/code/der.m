% Numerical Derivative

function Df = der(f, x)
h = 10^-5;
Df = 0.5*(h^-1)*(f(x+h)-f(x-h));
end
