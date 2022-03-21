import tw from 'twrnc';

export const HomeStyle = tw`flex-1 bg-white items-center justify-center`;

export const isEmail = (value) => {
  const regex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!(value !== undefined && regex.test(value))) {
    return '이메일 형식이 아닙니다.';
  }
};
