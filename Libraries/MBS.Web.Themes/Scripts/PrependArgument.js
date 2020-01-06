Function.prototype.PrependArgument = function(arg)
{
    var func = this;
    return function()
	{
        var newargs = [arg];
        for (var i = 0; i < arguments.length; i++)
		{
            newargs.push(arguments[i]);
		}
        return func.apply(this, newargs);
    };
};