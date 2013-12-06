public class TestReturnValue{

	public static void main(String[] args) {
		System.out.println(returnValue);
	}


	public static Object returnValue(){
		return false | "value";
	}
}